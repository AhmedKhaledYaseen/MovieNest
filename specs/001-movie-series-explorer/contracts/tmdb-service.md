# TMDB Service Layer Contract: MovieNest

**Date**: 2026-09-18 | **Plan**: [plan.md](file:///d:/Projects/Front-end/MovieNest/specs/001-movie-series-explorer/plan.md)

## Overview

The TMDB service layer has two tiers:

1. **Server-side** (`src/lib/tmdbServer.ts`) — Used by API routes to call TMDB directly. Injects the API key from `process.env`.
2. **Client-side** (`src/services/tmdb/*`) — Used by React components/hooks to call internal `/api/*` routes. Never touches TMDB directly.

```
[React Component]
      ↓ useQuery()
[TanStack Query Hook] (src/hooks/useMovies.ts)
      ↓
[Client Service] (src/services/tmdb/movies.ts)
      ↓ fetch("/api/movies/popular")
[API Route] (pages/api/movies/popular.ts)
      ↓
[Server TMDB Client] (src/lib/tmdbServer.ts)
      ↓ fetch("https://api.themoviedb.org/3/movie/popular?api_key=...")
[TMDB API]
```

---

## Server-Side TMDB Client

### `src/lib/tmdbServer.ts`

```typescript
// Interface contract — NOT implementation code

interface TMDBServerClient {
  /**
   * Generic fetch wrapper for TMDB API.
   * Adds API key and base URL automatically.
   * Throws typed errors on failure.
   */
  get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T>;
}
```

**Behavior**:
- Base URL: `https://api.themoviedb.org/3`
- API key injected from `process.env.TMDB_API_KEY`
- Returns parsed JSON response of type `T`
- Throws `TMDBError` on non-2xx responses with `status` and `message`
- Does NOT handle retries (that's TanStack Query's job on the client)

---

## Client-Side Service Layer

### `src/services/tmdb/client.ts`

```typescript
// Base client for internal API calls
interface APIClient {
  get<T>(url: string, params?: Record<string, string | number>): Promise<T>;
}
```

**Behavior**:
- Base URL: `/api` (relative to app origin)
- Returns parsed JSON or throws on HTTP errors
- Maps HTTP error responses to typed error objects

---

### `src/services/tmdb/movies.ts`

```typescript
interface MovieService {
  getTrending(page?: number): Promise<PaginatedResponse<Movie>>;
  getPopular(page?: number): Promise<PaginatedResponse<Movie>>;
  getTopRated(page?: number): Promise<PaginatedResponse<Movie>>;
  getUpcoming(page?: number): Promise<PaginatedResponse<Movie>>;
  discover(params: DiscoverParams): Promise<PaginatedResponse<Movie>>;
  getDetails(id: number): Promise<MovieDetails>;
  getCredits(id: number): Promise<CreditsResponse>;
  getVideos(id: number): Promise<VideosResponse>;
  getSimilar(id: number, page?: number): Promise<PaginatedResponse<Movie>>;
  getRecommendations(id: number, page?: number): Promise<PaginatedResponse<Movie>>;
}

interface DiscoverParams {
  page?: number;
  genre?: number;
  sort?: string;
}
```

---

### `src/services/tmdb/tv.ts`

```typescript
interface TVService {
  getTrending(page?: number): Promise<PaginatedResponse<TVShow>>;
  getPopular(page?: number): Promise<PaginatedResponse<TVShow>>;
  getTopRated(page?: number): Promise<PaginatedResponse<TVShow>>;
  discover(params: DiscoverParams): Promise<PaginatedResponse<TVShow>>;
  getDetails(id: number): Promise<TVShowDetails>;
  getCredits(id: number): Promise<CreditsResponse>;
  getVideos(id: number): Promise<VideosResponse>;
  getSimilar(id: number, page?: number): Promise<PaginatedResponse<TVShow>>;
  getRecommendations(id: number, page?: number): Promise<PaginatedResponse<TVShow>>;
}
```

---

### `src/services/tmdb/search.ts`

```typescript
interface SearchService {
  searchMulti(query: string, page?: number): Promise<PaginatedResponse<Movie | TVShow | Person>>;
  searchMovies(query: string, page?: number): Promise<PaginatedResponse<Movie>>;
  searchTV(query: string, page?: number): Promise<PaginatedResponse<TVShow>>;
  searchPeople(query: string, page?: number): Promise<PaginatedResponse<Person>>;
}
```

---

### `src/services/tmdb/people.ts`

```typescript
interface PeopleService {
  getDetails(id: number): Promise<PersonDetails>;
  // combined_credits are appended to the detail response via query param
}
```

---

### `src/services/tmdb/genres.ts`

```typescript
interface GenreService {
  getMovieGenres(): Promise<{ genres: Genre[] }>;
  getTVGenres(): Promise<{ genres: Genre[] }>;
}
```

---

## TanStack Query Hook Contracts

### `src/hooks/useMovies.ts`

| Hook | Query Key | Service Call | Stale Time |
|------|-----------|-------------|------------|
| `useTrendingMovies(page)` | `["movies", "trending", page]` | `movieService.getTrending(page)` | 5 min |
| `usePopularMovies(page)` | `["movies", "popular", page]` | `movieService.getPopular(page)` | 5 min |
| `useTopRatedMovies(page)` | `["movies", "top-rated", page]` | `movieService.getTopRated(page)` | 5 min |
| `useUpcomingMovies(page)` | `["movies", "upcoming", page]` | `movieService.getUpcoming(page)` | 5 min |
| `useDiscoverMovies(params)` | `["movies", "discover", params]` | `movieService.discover(params)` | 5 min |
| `useMovieDetails(id)` | `["movie", id]` | `movieService.getDetails(id)` | 10 min |
| `useMovieCredits(id)` | `["movie", id, "credits"]` | `movieService.getCredits(id)` | 30 min |
| `useMovieVideos(id)` | `["movie", id, "videos"]` | `movieService.getVideos(id)` | 30 min |
| `useSimilarMovies(id, page)` | `["movie", id, "similar", page]` | `movieService.getSimilar(id, page)` | 10 min |
| `useMovieRecommendations(id, page)` | `["movie", id, "recommendations", page]` | `movieService.getRecommendations(id, page)` | 10 min |

### `src/hooks/useTVShows.ts`

Mirrors `useMovies` with `["tv", ...]` query keys and `tvService.*` calls.

### `src/hooks/useSearch.ts`

| Hook | Query Key | Service Call | Stale Time |
|------|-----------|-------------|------------|
| `useSearch(query, type, page)` | `["search", query, type, page]` | `searchService.search*(query, page)` | 5 min |

**Note**: `enabled: !!query && query.length > 0` — query disabled when input empty.

### `src/hooks/usePerson.ts`

| Hook | Query Key | Service Call | Stale Time |
|------|-----------|-------------|------------|
| `usePersonDetails(id)` | `["person", id]` | `peopleService.getDetails(id)` | 30 min |

### `src/hooks/useGenres.ts`

| Hook | Query Key | Service Call | Stale Time |
|------|-----------|-------------|------------|
| `useMovieGenres()` | `["genres", "movie"]` | `genreService.getMovieGenres()` | 24 hours |
| `useTVGenres()` | `["genres", "tv"]` | `genreService.getTVGenres()` | 24 hours |

---

## Zustand Store Contracts

### `src/store/authStore.ts`

```typescript
interface AuthState {
  user: Omit<User, "password"> | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: RegisterData) => { success: boolean; error?: string };
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}
```

**Persistence**: `movienest_auth` key in localStorage

---

### `src/store/favoritesStore.ts`

```typescript
interface FavoritesState {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number, mediaType: "movie" | "tv") => void;
  isFavorite: (id: number, mediaType: "movie" | "tv") => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
  clearFavorites: () => void;
}
```

**Persistence**: `movienest_favorites_${userId}` key — re-keyed on user change

---

### `src/store/watchlistStore.ts`

```typescript
interface WatchlistState {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: number, mediaType: "movie" | "tv") => void;
  isInWatchlist: (id: number, mediaType: "movie" | "tv") => boolean;
  toggleWatchlist: (item: WatchlistItem) => void;
  clearWatchlist: () => void;
}
```

**Persistence**: `movienest_watchlist_${userId}` key

---

### `src/store/uiStore.ts`

```typescript
interface UIState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}
```

**Persistence**: None (transient UI state)
