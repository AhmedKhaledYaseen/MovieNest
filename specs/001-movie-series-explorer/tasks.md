# Tasks: MovieNest — Movie & TV Series Explorer

**Generated**: 2026-09-19 | **Plan**: [plan.md](file:///d:/Projects/Front-end/MovieNest/specs/001-movie-series-explorer/plan.md) | **Spec**: [spec.md](file:///d:/Projects/Front-end/MovieNest/specs/001-movie-series-explorer/spec.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js 14.x project with Pages Router, TypeScript strict mode, and React 18.x in project root using `npx create-next-app@14 ./ --typescript --use-npm --no-app --no-src-dir` then move source into `src/` per plan.md structure. IMPORTANT: Use `@14` (not `@latest`) to pin Next.js 14.x as specified in plan.md — Next.js 15 has breaking changes
- [ ] T002 [P] Install primary dependencies: `tailwindcss postcss autoprefixer @tanstack/react-query zustand react-hook-form @hookform/resolvers zod lucide-react next-themes` in package.json
- [ ] T003 [P] Install dev dependencies: `eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks @types/node @types/react @types/react-dom` in package.json
- [ ] T004 Configure Tailwind CSS with `class` dark mode strategy, content paths for `pages/**` and `src/**`, and custom cinematic color palette in tailwind.config.ts
- [ ] T005 [P] Configure ESLint strict rules in eslint.config.mjs with TypeScript, React, and accessibility plugins
- [ ] T006 [P] Configure Prettier in prettier.config.mjs with consistent formatting rules
- [ ] T007 Configure PostCSS in postcss.config.mjs with tailwindcss and autoprefixer plugins
- [ ] T008 Configure TypeScript strict mode in tsconfig.json with `"strict": true`, path aliases (`@/*` → `src/*`), and Next.js-specific settings
- [ ] T009 [P] Create `.env.example` with `TMDB_API_KEY=your_api_key_here` and `.env.local` (gitignored) template
- [ ] T010 [P] Update `.gitignore` to include `.env.local`, `node_modules/`, `.next/`, and `out/`
- [ ] T011 Configure `next.config.ts` with TMDB image domain (`image.tmdb.org`) for `next/image`, and any required Next.js settings
- [ ] T012 Initialize shadcn/ui with `npx shadcn-ui@latest init` and install required components: Button, Card, Dialog, DropdownMenu, Input, Label, Skeleton, Tabs, Badge, Avatar, Sheet, Separator, Toast/Sonner into src/components/ui/
- [ ] T013 Create global styles in src/styles/globals.css with Tailwind directives, CSS variables for shadcn/ui theming (dark/light mode HSL tokens), and base reset styles
- [ ] T014 Create project directory structure per plan.md: `src/components/{layout,media,people,search,auth,common}/`, `src/hooks/`, `src/services/{tmdb,auth}/`, `src/store/`, `src/types/`, `src/utils/`, `src/lib/`, `public/images/`

**Checkpoint**: Project scaffolding complete — all config files in place, dependencies installed, build succeeds with `npm run dev`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T015 [P] Create TypeScript types for Movie entity in src/types/movie.ts with all fields from data-model.md: `id` (number, non-null), `title` (string, non-null), `original_title` (string, non-null), `overview` (string, nullable), `poster_path` (string | null), `backdrop_path` (string | null), `release_date` (string, nullable), `vote_average` (number, 0–10 scale, non-null), `vote_count` (number, non-null), `popularity` (number, non-null), `genre_ids` (number[], non-null), `genres` (Genre[], non-null), `adult` (boolean, non-null), `media_type` ("movie"), and detail-only fields: `tagline` (string, nullable), `runtime` (number | null), `status` (string, non-null), `budget` (number, 0 if unknown, non-null), `revenue` (number, 0 if unknown, non-null), `production_companies` (ProductionCompany[], non-null), `spoken_languages` (SpokenLanguage[], non-null), `homepage` (string | null)
- [ ] T016 [P] Create TypeScript types for TVShow entity in src/types/tv.ts with all fields from data-model.md: `id` (number), `name` (string), `original_name` (string), `overview` (string, nullable), `poster_path` (string | null), `backdrop_path` (string | null), `first_air_date` (string, nullable), `vote_average` (number, 0–10), `vote_count` (number), `popularity` (number), `genre_ids` (number[]), `genres` (Genre[]), `media_type` ("tv"), and detail-only: `last_air_date` (string | null), `number_of_seasons` (number), `number_of_episodes` (number), `status` (string — "Returning Series", "Ended", "Canceled"), `networks` (Network[]), `seasons` (Season[]), `tagline` (string, nullable), `created_by` (Creator[]), `episode_run_time` (number[])
- [ ] T017 [P] Create TypeScript types for Person entity in src/types/person.ts with fields: `id` (number), `name` (string), `profile_path` (string | null), `known_for_department` (string), `popularity` (number), `media_type` ("person"), and detail-only: `biography` (string, nullable), `birthday` (string | null, YYYY-MM-DD), `deathday` (string | null), `place_of_birth` (string | null), `also_known_as` (string[]), `homepage` (string | null), `gender` (number — 0=not set, 1=female, 2=male, 3=non-binary)
- [ ] T018 [P] Create TypeScript types for Genre (`id`: number, `name`: string), Season (`id`, `name`, `overview` nullable, `poster_path` string | null, `season_number` — 0=specials, `episode_count`, `air_date` string | null, `vote_average`), CastMember, CrewMember, Video (`id`: string, `key`: string YouTube/Vimeo key, `name`, `site`, `type` — Trailer/Teaser/Clip/Featurette, `official`: boolean), and supporting types (ProductionCompany, Network, Creator, SpokenLanguage) in src/types/common.ts
- [ ] T019 [P] Create TypeScript types for API response wrappers in src/types/common.ts: `PaginatedResponse<T>` (page, results: T[], total_pages, total_results), `CreditsResponse` (id, cast: CastMember[], crew: CrewMember[]), `VideosResponse` (id, results: Video[]), `CombinedCreditsResponse` (id, cast: (Movie | TVShow)[], crew: (Movie | TVShow & { job, department })[])
- [ ] T020 [P] Create TypeScript types for local entities in src/types/auth.ts: `User` (id: string UUID, name: string min 2 chars, email: string valid format unique, password: string min 6 chars, createdAt: string ISO 8601), `AuthSession` (user: Omit<User, "password">, isAuthenticated: boolean), `FavoriteItem` (id: number, mediaType: "movie" | "tv", title: string, posterPath: string | null, voteAverage: number, releaseDate: string | null, addedAt: string ISO 8601), `WatchlistItem` (same shape as FavoriteItem)
- [ ] T021 Create barrel export file src/types/index.ts re-exporting all types from movie.ts, tv.ts, person.ts, common.ts, auth.ts
- [ ] T022 Create TMDB utility helpers in src/utils/tmdb.ts: image URL builder function accepting path and size (poster sizes: w342, w500; backdrop: w780, w1280; profile: w185, h632), TMDB image base URL constant (`https://image.tmdb.org/t/p/`), and null-safe helper returning placeholder path when poster_path/backdrop_path/profile_path is null
- [ ] T023 [P] Create date formatting utilities in src/utils/date.ts: format release date (YYYY-MM-DD → readable), extract year from date string, format runtime minutes to "Xh Ym"
- [ ] T024 [P] Create validation utilities in src/utils/validation.ts: email format validator, password strength check (min 6 chars per User entity), name length check (min 2 chars per User entity)
- [ ] T025 [P] Create application constants in src/utils/constants.ts: TMDB image sizes, localStorage keys (`movienest_users`, `movienest_auth`, `movienest_favorites_${userId}`, `movienest_watchlist_${userId}`), default stale times (5 min, 10 min, 30 min, 24 hours per tmdb-service.md), sort options, pagination limits
- [ ] T026 Create server-side TMDB client in src/lib/tmdbServer.ts per tmdb-service.md contract: generic `get<T>(endpoint, params)` function that prepends base URL `https://api.themoviedb.org/3`, injects `process.env.TMDB_API_KEY`, returns parsed JSON of type T, and throws typed `TMDBError` on non-2xx responses with status and message. MUST validate `process.env.TMDB_API_KEY` exists on first call — if missing or empty, throw a descriptive `ConfigurationError` with message "TMDB_API_KEY is not configured. Add it to .env.local" so the app fails fast with a clear error instead of returning cryptic API failures (spec Edge Case: missing/invalid API key)
- [ ] T027 Create client-side API base client in src/services/tmdb/client.ts per tmdb-service.md contract: generic `get<T>(url, params)` function using `/api` base URL, returns parsed JSON, maps HTTP errors to typed error objects
- [ ] T028 Create TanStack Query client configuration in src/lib/queryClient.ts with: `staleTime: 5 minutes`, `gcTime: 30 minutes`, `retry: 3` with exponential backoff, `refetchOnWindowFocus: false` per research.md decisions
- [ ] T029 [P] Create SVG fallback placeholder images in public/images/: `placeholder-poster.svg` (2:3 aspect ratio), `placeholder-backdrop.svg` (16:9 aspect ratio), `placeholder-profile.svg` (1:1 aspect ratio) — simple cinematic-themed placeholders with film reel or camera icon
- [ ] T030 Create custom `_document.tsx` in pages/_document.tsx with theme flash prevention script injection per research.md dark mode decision, and proper HTML structure
- [ ] T031 Create `_app.tsx` in pages/_app.tsx wrapping the application with: TanStack QueryClientProvider (using queryClient from T028), ThemeProvider from next-themes (attribute="class", defaultTheme="system", enableSystem=true), Zustand store hydration, global CSS import, and Layout component shell
- [ ] T032 Create Zod validation schemas in src/utils/validation.ts (or co-located): `loginSchema` (email: valid format required, password: min 6 chars required) and `registerSchema` (name: required min 2 chars, email: valid format required, password: min 6 chars required, confirmPassword: must match password) per research.md

**Checkpoint**: Foundation ready — all types defined, utilities created, providers configured, API client layer operational. User story implementation can now begin.

---

## Phase 3: User Story 1 — Browse & Discover Trending Content (Priority: P1) 🎯 MVP

**Goal**: Deliver the home page with hero section, content rows, and navigation to detail pages — the first impression of the application.

**Independent Test**: Open `/` → hero loads with real trending movie → all content rows render with poster cards → clicking a card navigates to the correct details page.

### Implementation for User Story 1

- [ ] T033 [US1] Create movie client service in src/services/tmdb/movies.ts per tmdb-service.md: `getTrending(page)`, `getPopular(page)`, `getTopRated(page)`, `getUpcoming(page)` calling `/api/movies/trending`, `/api/movies/popular`, `/api/movies/top-rated`, `/api/movies/upcoming` respectively, returning `PaginatedResponse<Movie>`
- [ ] T034 [P] [US1] Create TV client service in src/services/tmdb/tv.ts per tmdb-service.md: `getTrending(page)`, `getPopular(page)`, `getTopRated(page)` calling `/api/tv/trending`, `/api/tv/popular`, `/api/tv/top-rated`, returning `PaginatedResponse<TVShow>`
- [ ] T035 [P] [US1] Create genre client service in src/services/tmdb/genres.ts per tmdb-service.md: `getMovieGenres()`, `getTVGenres()` calling `/api/genres/movie`, `/api/genres/tv`, returning `{ genres: Genre[] }`
- [ ] T036 [US1] Create TanStack Query hooks in src/hooks/useMovies.ts per tmdb-service.md hook contracts: `useTrendingMovies(page)` (key: `["movies","trending",page]`, stale 5min), `usePopularMovies(page)` (key: `["movies","popular",page]`, stale 5min), `useTopRatedMovies(page)` (key: `["movies","top-rated",page]`, stale 5min), `useUpcomingMovies(page)` (key: `["movies","upcoming",page]`, stale 5min)
- [ ] T037 [P] [US1] Create TanStack Query hooks in src/hooks/useTVShows.ts: `useTrendingTVShows(page)` (key: `["tv","trending",page]`), `usePopularTVShows(page)`, `useTopRatedTVShows(page)` with 5min stale time
- [ ] T038 [P] [US1] Create TanStack Query hooks in src/hooks/useGenres.ts per tmdb-service.md: `useMovieGenres()` (key: `["genres","movie"]`, stale 24h), `useTVGenres()` (key: `["genres","tv"]`, stale 24h)
- [ ] T039 [US1] Create API route pages/api/movies/trending.ts: validate GET method, extract `page` query param (default 1), call `tmdbServer.get('/trending/movie/week', { page })`, return `PaginatedResponse<Movie>`, handle errors with proper status codes (400, 405, 429, 500)
- [ ] T040 [P] [US1] Create API route pages/api/movies/popular.ts: proxy to TMDB `/movie/popular` with page param
- [ ] T041 [P] [US1] Create API route pages/api/movies/top-rated.ts: proxy to TMDB `/movie/top_rated` with page param
- [ ] T042 [P] [US1] Create API route pages/api/movies/upcoming.ts: proxy to TMDB `/movie/upcoming` with page param
- [ ] T043 [P] [US1] Create API route pages/api/tv/trending.ts: proxy to TMDB `/trending/tv/week` with page param
- [ ] T044 [P] [US1] Create API route pages/api/tv/popular.ts: proxy to TMDB `/tv/popular` with page param
- [ ] T045 [P] [US1] Create API route pages/api/tv/top-rated.ts: proxy to TMDB `/tv/top_rated` with page param
- [ ] T046 [P] [US1] Create API route pages/api/genres/movie.ts: proxy to TMDB `/genre/movie/list`, return `{ genres: Genre[] }`
- [ ] T047 [P] [US1] Create API route pages/api/genres/tv.ts: proxy to TMDB `/genre/tv/list`, return `{ genres: Genre[] }`
- [ ] T048 [P] [US1] Create API route pages/api/trending/all.ts: proxy to TMDB `/trending/all/week` with page param, return `PaginatedResponse<Movie | TVShow>`
- [ ] T049 [US1] Create ImageWithFallback component in src/components/common/ImageWithFallback.tsx: wraps `next/image`, accepts `src`, `fallbackSrc`, `alt`, and standard image props; renders fallback SVG when `src` is null or image fails to load (FR-025)
- [ ] T050 [P] [US1] Create LoadingSkeleton component in src/components/common/LoadingSkeleton.tsx using shadcn/ui Skeleton: variants for poster card (2:3 ratio), backdrop hero (16:9), text lines, and profile circle — renders within 200ms (FR-021)
- [ ] T051 [P] [US1] Create ErrorState component in src/components/common/ErrorState.tsx: displays user-friendly error message with retry button, icon, and description — no raw error codes (FR-022)
- [ ] T052 [P] [US1] Create EmptyState component in src/components/common/EmptyState.tsx: displays icon, heading, and description with optional action button for when no results exist (FR-023)
- [ ] T053 [P] [US1] Create Rating component in src/components/common/Rating.tsx: displays vote_average as a visual star/circle rating with numeric value (0–10 scale), colored by rating quality
- [ ] T054 [US1] Create MediaCard component in src/components/media/MediaCard.tsx (FR-028): unified movie/TV card with poster (ImageWithFallback), title, rating (Rating component), year (extracted from release_date or first_air_date), media type badge ("Movie"/"TV"), favorite button, and watchlist button. Hover: subtle scale animation revealing metadata and quick-action buttons. Accepts onClick for navigation. MUST support both movie and TV show data shapes via `media_type` discriminator
- [ ] T055 [US1] Create MediaRow component in src/components/media/MediaRow.tsx: horizontally scrollable row with section title, left/right scroll arrows, and a collection of MediaCard components. Smooth scroll behavior with overflow hidden on mobile
- [ ] T056 [US1] Create MediaHero component in src/components/media/MediaHero.tsx: cinematic hero section displaying a featured trending movie with backdrop image (w1280), title, overview (truncated), rating, release year, genre tags, "Watch Trailer" button, and "View Details" button. Uses ImageWithFallback for backdrop (FR-001)
- [ ] T057 [US1] Create Layout component in src/components/layout/Layout.tsx: wraps pages with Navbar at top, main content area, and Footer at bottom. Accepts `children` prop
- [ ] T058 [US1] Create Navbar component in src/components/layout/Navbar.tsx (FR-020): responsive navigation bar with MovieNest logo/brand, links to Home, Movies, TV Shows, Search, and conditional auth links (Favorites, Watchlist when authenticated, Login/Register when not). Includes theme toggle button and mobile hamburger menu trigger. Active link highlighting
- [ ] T059 [P] [US1] Create MobileMenu component in src/components/layout/MobileMenu.tsx: slide-in mobile menu using shadcn/ui Sheet, containing all navigation links, theme toggle, and auth status. Closes on route change
- [ ] T060 [P] [US1] Create Footer component in src/components/layout/Footer.tsx: simple footer with MovieNest branding, TMDB attribution (required by TMDB ToS), and navigation links
- [ ] T061 [US1] Create ScrollToTop component in src/components/common/ScrollToTop.tsx (FR-029): floating button that appears on scroll and smoothly scrolls to top. Also exports `scrollToTop()` utility for pagination changes
- [ ] T062 [US1] Create Zustand UI store in src/store/uiStore.ts per tmdb-service.md contract: `isMobileMenuOpen` (boolean), `toggleMobileMenu()`, `closeMobileMenu()` — no persistence (transient UI state)
- [ ] T063 [US1] Create home page in pages/index.tsx: renders MediaHero with featured trending movie (first result from trending endpoint), then MediaRow sections for Trending Movies, Trending TV Shows, Popular Movies, Popular TV Shows, Top Rated Movies, Top Rated TV Shows, Upcoming Movies, and Popular People — each using corresponding TanStack Query hooks. Skeleton loading via LoadingSkeleton while data fetches. SEO via next/head with title "MovieNest — Discover Movies & TV Shows" (FR-001, FR-002, FR-024)
- [ ] T064 [US1] Create PersonCard component in src/components/people/PersonCard.tsx: displays person profile image (ImageWithFallback with placeholder-profile.svg), name, and known_for_department. Click navigates to `/person/[id]`

**Checkpoint**: Home page fully functional with real TMDB data, all content rows rendering, hero section showcasing a trending movie, and navigation to detail pages via card clicks.

---

## Phase 4: User Story 2 — Explore Movies with Filtering & Pagination (Priority: P1)

**Goal**: Deliver the Movies browse page with genre filtering, sorting, URL-synced pagination, and shareable/bookmarkable state.

**Independent Test**: Visit `/movies` → apply genre filter "Action" and sort "popularity.desc" → navigate to page 2 → copy URL → open in new tab → same view loads.

### Implementation for User Story 2

- [ ] T065 [US2] Add `discover(params: DiscoverParams)` method to src/services/tmdb/movies.ts calling `/api/movies/discover` with `{ page, genre, sort }` params, returning `PaginatedResponse<Movie>` per tmdb-service.md
- [ ] T066 [US2] Add `useDiscoverMovies(params)` hook to src/hooks/useMovies.ts with query key `["movies","discover", params]` and 5min stale time per tmdb-service.md
- [ ] T067 [US2] Create API route pages/api/movies/discover.ts: extract `page` (default 1), `genre` (optional number), `sort` (default "popularity.desc", validate against allowed values: popularity.desc, popularity.asc, vote_average.desc, vote_average.asc, release_date.desc, release_date.asc), proxy to TMDB `/discover/movie` with `with_genres` and `sort_by` params
- [ ] T068 [US2] Create MediaFilters component in src/components/media/MediaFilters.tsx: genre dropdown selector (populated from useMovieGenres/useTVGenres), sort dropdown (popularity, rating, release date — asc/desc), and active filter display with clear button. Emits onChange with selected genre and sort values
- [ ] T069 [US2] Create Pagination component in src/components/common/Pagination.tsx: previous/next buttons, page number display, disabled state on first/last page. Accepts currentPage, totalPages, onPageChange. Triggers scrollToTop on page change (FR-029)
- [ ] T070 [US2] Create MediaGrid component in src/components/media/MediaGrid.tsx: responsive grid layout of MediaCard components. 1 column on mobile, 2 on small tablet, 3 on tablet, 4–5 on desktop. Accepts items array and loading state (shows skeleton grid when loading)
- [ ] T071 [US2] Create Movies browse page in pages/movies/index.tsx: page heading, MediaFilters (genre + sort), MediaGrid of movie cards, Pagination. URL query params drive state (`genre`, `sort`, `page`) — read from `next/router` query on mount, update URL on filter/sort/page change. Loading skeletons while fetching (FR-021). Empty state when no results (FR-023). SEO title "Browse Movies — MovieNest" via next/head (FR-003, FR-024)

**Checkpoint**: Movies page fully functional with genre filtering, sorting, pagination, URL sync, and shareable URLs.

---

## Phase 5: User Story 3 — Explore TV Shows with Filtering & Pagination (Priority: P1)

**Goal**: Deliver the TV Shows browse page mirroring the Movies page but for TV content — demonstrating component reuse.

**Independent Test**: Visit `/tv` → apply genre filter → verify grid, pagination, and URL sync all function correctly.

### Implementation for User Story 3

- [ ] T072 [US3] Add `discover(params: DiscoverParams)` method to src/services/tmdb/tv.ts calling `/api/tv/discover` with `{ page, genre, sort }`, returning `PaginatedResponse<TVShow>`
- [ ] T073 [US3] Add `useDiscoverTVShows(params)` hook to src/hooks/useTVShows.ts with query key `["tv","discover", params]` and 5min stale time
- [ ] T074 [US3] Create API route pages/api/tv/discover.ts: extract page, genre, sort params, proxy to TMDB `/discover/tv` with `with_genres` and `sort_by`
- [ ] T075 [US3] Create TV Shows browse page in pages/tv/index.tsx: reuse MediaFilters (with TV genres from useTVGenres), MediaGrid, Pagination. URL-driven state. Loading skeletons. Empty state. Error state with retry (FR-004). SEO title "Browse TV Shows — MovieNest" (FR-024)

**Checkpoint**: TV Shows page mirrors Movies page with full filtering, pagination, and URL sync — components are reused.

---

## Phase 6: User Story 4 — View Movie Details (Priority: P1)

**Goal**: Deliver the rich, cinematic Movie Details page with all metadata, cast/crew, videos, similar movies, and recommendations.

**Independent Test**: Navigate to `/movies/550` (Fight Club) → verify all data sections render → watch trailer → test favorites/watchlist buttons.

### Implementation for User Story 4

- [ ] T076 [US4] Add `getDetails(id)`, `getCredits(id)`, `getVideos(id)`, `getSimilar(id, page)`, `getRecommendations(id, page)` methods to src/services/tmdb/movies.ts per tmdb-service.md contract
- [ ] T077 [US4] Add TanStack Query hooks to src/hooks/useMovies.ts: `useMovieDetails(id)` (key: `["movie",id]`, stale 10min), `useMovieCredits(id)` (key: `["movie",id,"credits"]`, stale 30min), `useMovieVideos(id)` (key: `["movie",id,"videos"]`, stale 30min), `useSimilarMovies(id,page)` (key: `["movie",id,"similar",page]`, stale 10min), `useMovieRecommendations(id,page)` (key: `["movie",id,"recommendations",page]`, stale 10min)
- [ ] T078 [P] [US4] Create API route pages/api/movies/[id]/index.ts: extract movie ID from query, proxy to TMDB `/movie/{id}`, return MovieDetails, handle 404 for invalid IDs
- [ ] T079 [P] [US4] Create API route pages/api/movies/[id]/credits.ts: proxy to TMDB `/movie/{id}/credits`, return CreditsResponse
- [ ] T080 [P] [US4] Create API route pages/api/movies/[id]/videos.ts: proxy to TMDB `/movie/{id}/videos`, return VideosResponse
- [ ] T081 [P] [US4] Create API route pages/api/movies/[id]/similar.ts: proxy to TMDB `/movie/{id}/similar` with page, return PaginatedResponse<Movie>
- [ ] T082 [P] [US4] Create API route pages/api/movies/[id]/recommendations.ts: proxy to TMDB `/movie/{id}/recommendations` with page, return PaginatedResponse<Movie>
- [ ] T083 [US4] Create TrailerModal component in src/components/common/TrailerModal.tsx (FR-026): shadcn/ui Dialog containing YouTube iframe embed using video `key` from Video entity. Proper focus management, close on Escape, responsive sizing. Accepts `videoKey`, `isOpen`, `onClose` props
- [ ] T084 [US4] Create MediaDetails component in src/components/media/MediaDetails.tsx: comprehensive detail display with backdrop (w1280), poster (w500), title, original_title, tagline, overview, rating (Rating component), vote_count, release_date, runtime (formatted as Xh Ym), genres (as tags), status, production_companies, budget (formatted as currency), revenue (formatted as currency). "Watch Trailer" button (opens TrailerModal, hidden if no trailer), "Add to Favorites" button, "Add to Watchlist" button. Responsive layout: poster + info side-by-side on desktop, stacked on mobile
- [ ] T085 [US4] Create Movie Details page in pages/movies/[id].tsx: uses useMovieDetails, useMovieCredits, useMovieVideos, useSimilarMovies, useMovieRecommendations. Renders MediaDetails (movie info), Cast section (horizontal scrollable PersonCards with character names), Crew section (Director, Writer, etc.), Videos section, Similar Movies row (MediaRow), Recommendations row (MediaRow). Loading skeletons. Error state for invalid IDs (FR-022). SEO: dynamic title "{Movie Title} — MovieNest", meta description from overview, og:image from poster (FR-024)

**Checkpoint**: Movie Details page renders all data for any valid movie ID with trailer playback, cast/crew, and related content sections.

---

## Phase 7: User Story 5 — View TV Show Details (Priority: P1)

**Goal**: Deliver the TV Show Details page with seasons interface, cast/crew, videos, and related content.

**Independent Test**: Navigate to `/tv/1399` (Breaking Bad) → verify all TV-specific fields render → seasons section shows properly.

### Implementation for User Story 5

- [ ] T086 [US5] Add `getDetails(id)`, `getCredits(id)`, `getVideos(id)`, `getSimilar(id, page)`, `getRecommendations(id, page)` methods to src/services/tmdb/tv.ts per tmdb-service.md
- [ ] T087 [US5] Add TanStack Query hooks to src/hooks/useTVShows.ts: `useTVShowDetails(id)` (key: `["tv",id]`, stale 10min), `useTVShowCredits(id)`, `useTVShowVideos(id)`, `useSimilarTVShows(id,page)`, `useTVShowRecommendations(id,page)` mirroring movie hook stale times
- [ ] T088 [P] [US5] Create API route pages/api/tv/[id]/index.ts: proxy to TMDB `/tv/{id}`, return TVShowDetails
- [ ] T089 [P] [US5] Create API route pages/api/tv/[id]/credits.ts: proxy to TMDB `/tv/{id}/credits`
- [ ] T090 [P] [US5] Create API route pages/api/tv/[id]/videos.ts: proxy to TMDB `/tv/{id}/videos`
- [ ] T091 [P] [US5] Create API route pages/api/tv/[id]/similar.ts: proxy to TMDB `/tv/{id}/similar`
- [ ] T092 [P] [US5] Create API route pages/api/tv/[id]/recommendations.ts: proxy to TMDB `/tv/{id}/recommendations`
- [ ] T093 [US5] Create TV Show Details page in pages/tv/[id].tsx: uses TV-specific hooks. Renders: backdrop, poster, title, overview, rating, first_air_date, last_air_date, number_of_seasons, number_of_episodes, genres, status, networks (with logo), tagline, created_by. Seasons section with clean interface showing each season's name, episode_count, air_date (using Season entity fields: `season_number` where 0=specials). Cast/Crew, Videos, Similar Shows, Recommendations. Loading skeletons. Error handling for invalid IDs. SEO: dynamic title "{Show Name} — MovieNest" (FR-007, FR-024)

**Checkpoint**: TV Show Details page fully functional with seasons browser, all sections, and proper TV-specific data display.

---

## Phase 8: User Story 6 — Search Across Movies, TV Shows, and People (Priority: P1)

**Goal**: Deliver the search page with debounced input, type filtering, pagination, and shareable URL state.

**Independent Test**: Visit `/search?q=inception&type=movie&page=1` → results appear → type filter works → pagination works → no request on every keystroke.

### Implementation for User Story 6

- [ ] T094 [US6] Create search client service in src/services/tmdb/search.ts per tmdb-service.md: `searchMulti(query, page)`, `searchMovies(query, page)`, `searchTV(query, page)`, `searchPeople(query, page)` calling `/api/search` with `q`, `type`, `page` params
- [ ] T095 [US6] Create TanStack Query hook in src/hooks/useSearch.ts per tmdb-service.md: `useSearch(query, type, page)` with key `["search", query, type, page]`, 5min stale time, and `enabled: !!query && query.length > 0` to prevent empty queries
- [ ] T096 [US6] Create useDebounce hook in src/hooks/useDebounce.ts: accepts value and delay (default 300ms per spec SC-011), returns debounced value. Used to debounce search input before triggering useSearch
- [ ] T097 [US6] Create API route pages/api/search.ts per api-routes.md: extract `q` (required, return 400 if missing), `type` (default "multi" — supports "multi", "movie", "tv", "person"), `page` (default 1). Route to appropriate TMDB endpoint: `/search/multi`, `/search/movie`, `/search/tv`, `/search/person`
- [ ] T098 [US6] Create SearchBar component in src/components/search/SearchBar.tsx: input field with search icon, clear button, auto-focus. Uses useDebounce. Emits debounced query onChange. Also usable in Navbar for quick search access (FR-005)
- [ ] T099 [US6] Create SearchFilters component in src/components/search/SearchFilters.tsx: type filter tabs/buttons for All, Movies, TV Shows, People. Emits selected type onChange
- [ ] T100 [US6] Create SearchResults component in src/components/search/SearchResults.tsx: renders MediaGrid for movie/TV results or PersonCard grid for person results, handling the `media_type` discriminator to render appropriate card types
- [ ] T101 [US6] Create Search page in pages/search.tsx: SearchBar, SearchFilters, SearchResults, Pagination. URL query params: `q` (search query), `type` (filter), `page`. Read from router on mount, update URL on changes. Loading skeletons. Empty state when no results (FR-023). SEO title "Search — MovieNest" (FR-005, FR-024)

**Checkpoint**: Search page fully functional with debounced input (max 1 request per 300ms), type filtering, pagination, and shareable URLs.

---

## Phase 9: User Story 7 — Register, Login, and Manage Demo Authentication (Priority: P2)

**Goal**: Deliver demo authentication with registration, login, session persistence, and logout using localStorage.

**Independent Test**: Register at `/register` → login at `/login` → refresh page (session persists) → logout (session clears).

### Implementation for User Story 7

- [ ] T102 [US7] Create auth service in src/services/auth/storage.ts: localStorage operations for users array (`movienest_users`): `getUsers()`, `saveUser(user)`, `findUserByEmail(email)`, `isEmailTaken(email)` — email uniqueness check returns boolean (FR-030)
- [ ] T103 [US7] Create auth service in src/services/auth/authService.ts: `register(data: RegisterData)` validates uniqueness of email (MUST fail with clear error if email already exists per data-model.md), stores new User with generated UUID and ISO 8601 createdAt, returns `{ success, error? }`. `login(email, password)` finds user by email, verifies password, returns `{ success, user?, error? }`. `validateSession()` checks if session data is valid
- [ ] T104 [US7] Create Zustand auth store in src/store/authStore.ts per tmdb-service.md contract: state `user` (Omit<User,"password"> | null), `isAuthenticated` (boolean). Actions: `login(email, password)` → calls authService, sets user/isAuthenticated; `register(data)` → calls authService, auto-logs-in; `logout()` → clears user, sets isAuthenticated false. Persist middleware with key `movienest_auth` (FR-009, FR-010)
- [ ] T105 [US7] Create useAuth hook in src/hooks/useAuth.ts: wraps authStore providing `user`, `isAuthenticated`, `login()`, `register()`, `logout()` and convenience computed values
- [ ] T106 [US7] Create LoginForm component in src/components/auth/LoginForm.tsx: email and password fields using React Hook Form + Zod loginSchema (email: valid format required, password: min 6 chars). Submit button, loading state, error display, link to register page. On success: redirect to intended page or home (FR-009)
- [ ] T107 [US7] Create RegisterForm component in src/components/auth/RegisterForm.tsx: name, email, password, confirm password fields using React Hook Form + Zod registerSchema (name: min 2 chars, email: valid format unique, password: min 6 chars, confirmPassword: must match). Validation errors shown per-field. Duplicate email error display. On success: auto-login and redirect (FR-009)
- [ ] T108 [US7] Create AuthGuard component in src/components/auth/AuthGuard.tsx: wraps protected page content, checks isAuthenticated from authStore, redirects to `/login` if not authenticated (or shows auth prompt). Used by favorites, watchlist, profile pages (FR-014)
- [ ] T109 [US7] Create Login page in pages/login.tsx: renders LoginForm, link to register. SEO title "Login — MovieNest". Redirect to home if already authenticated
- [ ] T110 [US7] Create Register page in pages/register.tsx: renders RegisterForm, link to login. SEO title "Register — MovieNest". Redirect to home if already authenticated
- [ ] T111 [US7] Update Navbar component (src/components/layout/Navbar.tsx) to show conditional links: when authenticated show user name/avatar, Favorites, Watchlist, Profile, Logout; when not authenticated show Login, Register

**Checkpoint**: Authentication flow complete — register, login, session persistence across refresh, logout, and data isolation between users.

---

## Phase 10: User Story 8 — Save Favorites and Manage Watchlist (Priority: P2)

**Goal**: Deliver favorites and watchlist functionality with per-user localStorage persistence, toggle actions, and dedicated management pages.

**Independent Test**: Log in → add movie to favorites and TV show to watchlist → navigate to `/favorites` and `/watchlist` → verify items appear → remove an item → verify removal.

### Implementation for User Story 8

- [ ] T112 [US8] Create Zustand favorites store in src/store/favoritesStore.ts per tmdb-service.md contract: state `favorites: FavoriteItem[]`. Actions: `addFavorite(item)` — adds with `addedAt` ISO 8601 timestamp, enforces uniqueness by `id` + `mediaType` combo (per data-model.md uniqueness rule: duplicate is no-op, toggle to remove), `removeFavorite(id, mediaType)`, `isFavorite(id, mediaType)` → boolean, `toggleFavorite(item)`, `clearFavorites()`. Persist middleware with key `movienest_favorites_${userId}` — re-keyed on user change (FR-011, FR-012)
- [ ] T113 [US8] Create Zustand watchlist store in src/store/watchlistStore.ts per tmdb-service.md contract: state `watchlist: WatchlistItem[]`. Actions: `addToWatchlist(item)`, `removeFromWatchlist(id, mediaType)`, `isInWatchlist(id, mediaType)`, `toggleWatchlist(item)`, `clearWatchlist()`. Persist with key `movienest_watchlist_${userId}`. Same uniqueness rule as favorites (FR-011, FR-013)
- [ ] T114 [US8] Create useFavorites hook in src/hooks/useFavorites.ts: wraps favoritesStore providing favorites list, toggle/add/remove actions, isFavorite check. If user not authenticated, shows login prompt toast instead of saving (FR-014)
- [ ] T115 [P] [US8] Create useWatchlist hook in src/hooks/useWatchlist.ts: mirrors useFavorites for watchlist. Login prompt toast for unauthenticated users (FR-014)
- [ ] T116 [US8] Integrate toast notification system: configure shadcn/ui Toast/Sonner in _app.tsx for toast notifications on user actions: "Added to favorites", "Removed from favorites", "Added to watchlist", "Removed from watchlist", "Please log in to save favorites", login/logout success, errors (FR-027)
- [ ] T117 [US8] Update MediaCard component (src/components/media/MediaCard.tsx) to connect favorite and watchlist buttons to stores: toggle on click, show filled/outlined icon state, toast feedback. Unauthenticated click → login prompt toast (FR-014, FR-028)
- [ ] T118 [US8] Update MediaDetails component (src/components/media/MediaDetails.tsx) to connect "Add to Favorites" and "Add to Watchlist" buttons to stores with toggle state and toast feedback
- [ ] T119 [US8] Create Favorites page in pages/favorites.tsx: AuthGuard wrapper, displays saved FavoriteItems in MediaGrid. Tabs or filter to switch between movies and TV shows. Remove button per item. Empty state when no favorites: "No favorites yet — start exploring movies!" (FR-012, FR-023). SEO title "My Favorites — MovieNest"
- [ ] T120 [US8] Create Watchlist page in pages/watchlist.tsx: AuthGuard wrapper, displays WatchlistItems in MediaGrid. Remove functionality. Empty state. SEO title "My Watchlist — MovieNest" (FR-013, FR-023)

**Checkpoint**: Favorites and watchlist fully functional — per-user persistence, toggle actions from cards and detail pages, dedicated management pages, toast feedback, and auth guards.

---

## Phase 11: User Story 9 — Explore Person/Actor Details (Priority: P2)

**Goal**: Deliver the Person Details page with profile info, biography, and filmography.

**Independent Test**: Navigate to `/person/287` (Brad Pitt) → verify profile info, biography, and filmography render correctly.

### Implementation for User Story 9

- [ ] T121 [US9] Create people client service in src/services/tmdb/people.ts per tmdb-service.md: `getDetails(id)` calling `/api/person/{id}?append=combined_credits`, returning PersonDetails with combined credits
- [ ] T122 [US9] Add TanStack Query hook in src/hooks/usePerson.ts per tmdb-service.md: `usePersonDetails(id)` with key `["person", id]` and 30min stale time
- [ ] T123 [US9] Create API route pages/api/person/[id].ts per api-routes.md: extract person ID, optional `append` param (default "combined_credits"), proxy to TMDB `/person/{id}?append_to_response={append}`, return PersonDetails. Handle 404 for invalid IDs
- [ ] T124 [US9] Create PersonDetails component in src/components/people/PersonDetails.tsx: profile image (h632 size, ImageWithFallback with placeholder-profile.svg for null profile_path), name, biography (expandable/collapsible for long text), birthday (formatted), deathday (if applicable), place_of_birth, known_for_department, also_known_as
- [ ] T125 [US9] Create Filmography component in src/components/people/Filmography.tsx: categorized list of acting and crew credits from CombinedCreditsResponse, separated into Acting and Crew tabs/sections. Each credit links to the movie or TV show detail page. Sorted by date or popularity
- [ ] T126 [US9] Create Person Details page in pages/person/[id].tsx: uses usePersonDetails. Renders PersonDetails component and Filmography component. Loading skeletons. Error state for invalid IDs. SEO: dynamic title "{Person Name} — MovieNest", meta description from biography excerpt (FR-008, FR-024)

**Checkpoint**: Person page renders profile info, biography, and complete filmography with navigation back to content pages.

---

## Phase 12: User Story 10 — Switch Between Dark and Light Mode (Priority: P2)

**Goal**: Deliver smooth dark/light mode toggle with localStorage persistence and system preference fallback.

**Independent Test**: Click theme toggle → smooth transition → refresh (persists) → clear localStorage (falls back to system preference).

### Implementation for User Story 10

- [ ] T127 [US10] Verify next-themes ThemeProvider configuration in pages/_app.tsx: `attribute="class"`, `defaultTheme="system"`, `enableSystem=true`, `storageKey="movienest_theme"` — should already be configured in T031 but verify and finalize
- [ ] T128 [US10] Verify theme flash prevention in pages/_document.tsx: next-themes script injection that sets the `class` attribute before first paint — should already exist from T030, verify and finalize
- [ ] T129 [US10] Create ThemeToggle button component (inline in Navbar or separate): uses `useTheme()` from next-themes, renders sun/moon icon (Lucide) based on current theme, smooth icon transition animation. Toggles between "light" and "dark" (FR-016)
- [ ] T130 [US10] Verify all Tailwind `dark:` variants are applied consistently across all existing components: backgrounds, text colors, borders, card surfaces, input fields, buttons, modals. Smooth CSS transitions on theme change (transition-colors duration-200)
- [ ] T131 [US10] Add CSS transition to global styles for smooth theme switching: `* { transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease; }` or scoped transition classes

**Checkpoint**: Theme toggle works smoothly, persists across sessions, respects system preference, no flash of incorrect theme on load.

---

## Phase 13: User Story 11 — View Profile (Priority: P3)

**Goal**: Deliver a simple profile page showing user info and stats.

**Independent Test**: Log in → navigate to `/profile` → verify name, email, favorites count, watchlist count display correctly.

### Implementation for User Story 11

- [ ] T132 [US11] Create Profile page in pages/profile.tsx: AuthGuard wrapper. Displays: user name, email, favorite count (from favoritesStore), watchlist count (from watchlistStore), account creation date (formatted from User.createdAt). Logout button. Redirect to `/login` if unauthenticated. SEO title "My Profile — MovieNest" (FR-015)

**Checkpoint**: Profile page shows user info, stats, and logout — rounds out the auth experience.

---

## Phase 14: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality pass

- [ ] T133 [P] Add SEO metadata to all remaining pages using next/head: ensure every page has unique title, meta description, and Open Graph tags (og:title, og:description, og:image). Home page og:image should be a MovieNest branded image (FR-024)
- [ ] T134 [P] Implement comprehensive error handling across all API routes: consistent error response format `{ error: string, status: number }`, proper HTTP status codes (400, 404, 405, 429, 500), TMDB API key missing check returning clear configuration error (Edge Case from spec)
- [ ] T135 [P] Add loading states audit: verify every page/component shows skeleton loaders within 200ms (SC-006) — no blank screens anywhere in the application
- [ ] T136 [P] Add responsive design audit: verify all pages render correctly at 320px, 375px, 768px, 1024px, 1440px+ (SC-005). Ensure touch targets ≥ 44×44px on mobile (Constitution VII)
- [ ] T137 [P] Add accessibility audit: semantic HTML (`<nav>`, `<main>`, `<article>`, `<button>`), alt text for all images, aria-labels for interactive elements, keyboard navigability for all interactive elements, focus management for modals (TrailerModal, MobileMenu), heading hierarchy (single h1 per page), WCAG 2.1 AA contrast ratios (SC-010, Constitution VI)
- [ ] T138 Create professional README.md at project root: project name/description, tech stack, features list, screenshots section (placeholder), prerequisites, setup instructions (clone, install, env config, run), project structure overview, available scripts, TMDB attribution, license
- [ ] T139 [P] Code quality final pass: ensure zero `any` types (search: `grep -r ": any" src/`), no hardcoded API keys, no console.log in production code, no dead/unused imports, no duplicated UI logic, TypeScript strict compilation passes (`tsc --noEmit`). MUST verify TMDB API key is never exposed to client-side code: run `grep -r "TMDB_API_KEY" src/ pages/` and confirm it appears ONLY in `src/lib/tmdbServer.ts` and `.env*` files — any other reference is a security violation (FR-017)
- [ ] T140 [P] Performance optimization pass: verify TanStack Query caching is effective, images use next/image with proper sizes, code splitting is working per route, debounced search fires max 1 request per 300ms (SC-011)
- [ ] T141 Run full quickstart.md validation: execute all 12 validation scenarios from quickstart.md to verify end-to-end functionality

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–13)**: All depend on Foundational phase completion
  - US1 (Home) → US2, US3, US4, US5, US6 can proceed after US1 components exist (MediaCard, MediaRow, etc.)
  - US2 (Movies) and US3 (TV) can run in parallel after US1
  - US4 (Movie Details) and US5 (TV Details) can run in parallel after US1
  - US6 (Search) can run in parallel after US1
  - US7 (Auth) can start after Foundational, independent of US1
  - US8 (Favorites/Watchlist) depends on US7 (Auth) and US1 (MediaCard)
  - US9 (Person) can start after US1 (PersonCard)
  - US10 (Theme) can start after Foundational (verify config)
  - US11 (Profile) depends on US7 (Auth) and US8 (stores exist)
- **Polish (Phase 14)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Foundation only — no story dependencies. **Must complete first** as it creates shared components (MediaCard, MediaRow, Layout, Navbar, etc.)
- **US2 (P1)**: Depends on US1 components (MediaGrid, MediaCard, Pagination) — can start during US1 if creating new components
- **US3 (P1)**: Depends on US1/US2 components (reuses MediaFilters, MediaGrid, Pagination)
- **US4 (P1)**: Depends on US1 (MediaCard, MediaRow, ImageWithFallback)
- **US5 (P1)**: Depends on US1 and can reuse US4 patterns
- **US6 (P1)**: Depends on US1 (MediaCard, PersonCard)
- **US7 (P2)**: Independent of content stories, depends on Foundation only
- **US8 (P2)**: Depends on US7 (auth stores) and US1 (MediaCard for button integration)
- **US9 (P2)**: Depends on US1 (PersonCard) and US4/US5 (for filmography links)
- **US10 (P2)**: Depends on Foundation — can be verified any time after initial setup
- **US11 (P3)**: Depends on US7 (auth) and US8 (favorites/watchlist counts)

### Within Each User Story

- Models/types before services
- Services before hooks
- API routes before client services (or in parallel if contracts are known)
- Hooks before components
- Components before pages
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, US1 through US7 can start (US1 should go first for shared components)
- Within US1: API routes T039–T048 can all run in parallel
- Within US4/US5: API routes can run in parallel
- US2 and US3 can run in parallel
- US4 and US5 can run in parallel
- US7 (Auth) can run in parallel with US2–US6
- US10 (Theme) can be verified in parallel with any story

---

## Parallel Example: User Story 1

```bash
# Launch all API routes for User Story 1 together:
Task: "Create API route pages/api/movies/popular.ts" (T040)
Task: "Create API route pages/api/movies/top-rated.ts" (T041)
Task: "Create API route pages/api/movies/upcoming.ts" (T042)
Task: "Create API route pages/api/tv/trending.ts" (T043)
Task: "Create API route pages/api/tv/popular.ts" (T044)
Task: "Create API route pages/api/tv/top-rated.ts" (T045)
Task: "Create API route pages/api/genres/movie.ts" (T046)
Task: "Create API route pages/api/genres/tv.ts" (T047)
Task: "Create API route pages/api/trending/all.ts" (T048)

# Launch all common UI components together:
Task: "Create LoadingSkeleton component" (T050)
Task: "Create ErrorState component" (T051)
Task: "Create EmptyState component" (T052)
Task: "Create Rating component" (T053)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (Home Page)
4. **STOP and VALIDATE**: Test home page independently — hero loads, content rows render, cards clickable
5. Deploy/demo if ready — first impression delivered

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 (Home) → Test independently → Deploy/Demo **(MVP!)**
3. Add US2 (Movies) + US3 (TV) → Test independently → Deploy/Demo
4. Add US4 (Movie Details) + US5 (TV Details) → Test → Deploy/Demo
5. Add US6 (Search) → Test → Deploy/Demo
6. Add US7 (Auth) + US8 (Favorites/Watchlist) → Test → Deploy/Demo
7. Add US9 (Person) + US10 (Theme) + US11 (Profile) → Test → Deploy/Demo
8. Polish pass → Final validation → Deploy

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Developer A: US1 (Home — creates shared components)
3. Once US1 shared components exist:
   - Developer A: US4 (Movie Details) + US5 (TV Details)
   - Developer B: US2 (Movies Browse) + US3 (TV Browse)
   - Developer C: US6 (Search) + US7 (Auth)
4. After US7 complete: Developer C → US8 (Favorites/Watchlist)
5. Remaining: US9, US10, US11 → Polish

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks within the same phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- TMDB API key MUST be in `.env.local` (never in client code) — all calls proxied via API routes
- Constitution principles guide all implementation: accessibility (NON-NEGOTIABLE), semantic HTML, no `any` types, meaningful names, proper error handling
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
