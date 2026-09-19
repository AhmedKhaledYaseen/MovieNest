# Research: MovieNest — Movie & TV Series Explorer

**Date**: 2026-09-18 | **Spec**: [spec.md](file:///d:/Projects/Front-end/MovieNest/specs/001-movie-series-explorer/spec.md) | **Plan**: [plan.md](file:///d:/Projects/Front-end/MovieNest/specs/001-movie-series-explorer/plan.md)

## Technology Decisions

### 1. Next.js Pages Router (NOT App Router)

**Decision**: Use Next.js 14.x with Pages Router exclusively.

**Rationale**: The requirements explicitly mandate Pages Router. This means:
- Routes defined in `pages/` directory
- API routes in `pages/api/`
- `next/router` for navigation (NOT `next/navigation`)
- `next/head` for SEO (NOT `metadata` export)
- `getServerSideProps` / `getStaticProps` available but client-side fetching via TanStack Query is the primary pattern
- No React Server Components
- `_app.tsx` for global providers and layout
- `_document.tsx` for custom HTML document (theme flash prevention)

**Alternatives considered**:
- App Router: Rejected — explicitly forbidden by requirements
- Vite + React Router: Rejected — requirements specify Next.js

---

### 2. Data Fetching Strategy: TanStack Query v5

**Decision**: Use TanStack Query v5 for all TMDB data fetching on the client side.

**Rationale**: TanStack Query provides:
- Automatic caching with configurable stale times
- Built-in loading, error, and success states
- Automatic retry with exponential backoff (solves TMDB rate limiting)
- Query deduplication (prevents duplicate requests)
- Background refetching
- Pagination support via `useQuery` with page params

**Configuration**:
```
staleTime: 5 minutes (TMDB data doesn't change frequently)
gcTime: 30 minutes (keep cached data for 30 min)
retry: 3 (with exponential backoff for rate limiting)
refetchOnWindowFocus: false (portfolio app, not real-time)
```

**Alternatives considered**:
- SWR: Similar capabilities but TanStack Query has richer devtools and pagination patterns
- Raw fetch + useEffect: Rejected — would require reimplementing caching, loading states, error handling

---

### 3. State Management: Zustand

**Decision**: Use Zustand for client-side application state with localStorage persistence.

**Rationale**: Zustand stores handle:
- `authStore`: Current user, login/logout, session management
- `favoritesStore`: Per-user favorite movies/TV shows with localStorage persistence
- `watchlistStore`: Per-user watchlist items with localStorage persistence
- `uiStore`: Theme preference, mobile menu state

**Key pattern**: Zustand's `persist` middleware with per-user key namespacing:
- Favorites key: `movienest_favorites_${userId}`
- Watchlist key: `movienest_watchlist_${userId}`
- Auth key: `movienest_auth`

**Alternatives considered**:
- Redux Toolkit: Overkill for this scope; Zustand is simpler and lighter
- React Context: Acceptable but lacks built-in persistence middleware
- Jotai/Recoil: Similar atomic approach but Zustand is more conventional for this pattern

---

### 4. Styling: Tailwind CSS + shadcn/ui

**Decision**: Tailwind CSS for utility-first styling, shadcn/ui for pre-built accessible components.

**Rationale**:
- Tailwind provides rapid, consistent styling with built-in dark mode support (`class` strategy)
- shadcn/ui provides accessible, customizable components (Button, Card, Dialog, DropdownMenu, Input, Skeleton, Toast, etc.)
- Components are copied into `src/components/ui/` — not a dependency, fully customizable
- Dark/light mode via `next-themes` + Tailwind's `dark:` variant

**shadcn/ui components needed**:
- Button, Card, Dialog, DropdownMenu, Input, Label, Skeleton, Toast/Sonner, Tabs, Badge, Avatar, Sheet (mobile menu), Separator

**Alternatives considered**:
- Material UI: Heavier, opinionated design system — not cinematic enough
- Chakra UI: Good but less flexible for custom cinematic design
- Vanilla CSS: Too slow for portfolio timeline; Tailwind is faster to ship

---

### 5. Form Validation: React Hook Form + Zod

**Decision**: React Hook Form for form management, Zod for schema validation.

**Rationale**:
- React Hook Form is performant (uncontrolled inputs, minimal re-renders)
- Zod provides type-safe schema validation with excellent TypeScript inference
- `@hookform/resolvers/zod` bridges them seamlessly
- Used for login and registration forms

**Validation schemas needed**:
- `loginSchema`: email (valid format), password (min 6 chars)
- `registerSchema`: name (required, min 2 chars), email (valid format), password (min 6 chars), confirmPassword (must match)

**Alternatives considered**:
- Formik + Yup: Heavier, more re-renders, Yup less TypeScript-native than Zod

---

### 6. TMDB API Proxy Architecture

**Decision**: All TMDB requests proxied through Next.js API routes in `pages/api/`.

**Rationale**:
- API key stays server-side only (never exposed to browser)
- API routes add a thin proxy layer: validate params → call TMDB → return response
- Centralized error handling for TMDB errors
- TMDB base URL and API key read from `process.env` in API routes

**Server-side TMDB client** (`src/lib/tmdbServer.ts`):
- Single fetch wrapper that adds API key and base URL
- Used by all API routes
- Handles TMDB error responses (401, 404, 429, 500)

**Client-side service layer** (`src/services/tmdb/`):
- Calls internal `/api/` routes (NOT TMDB directly)
- Used by TanStack Query hooks

**Data flow**:
```
Component → useQuery hook → service layer → /api/route → tmdbServer → TMDB API
```

**Alternatives considered**:
- Direct TMDB calls from client: Rejected — exposes API key
- getServerSideProps for all pages: Rejected — requirements prefer client-side fetching with TanStack Query for the portfolio demonstration value

---

### 7. Authentication Architecture

**Decision**: Frontend-only demo authentication with localStorage and a clean service abstraction.

**Rationale**:
- Requirements explicitly mandate no NextAuth, Auth.js, Firebase, Clerk, or Supabase
- Architecture designed for easy replacement with a real backend later
- Clean separation: Component → Auth hook/store → Auth service → localStorage

**Auth flow**:
```
Register: validate form → check email uniqueness → hash password (simple) → store user → auto-login
Login: validate form → find user by email → verify password → create session → redirect
Logout: clear session → redirect to home
Session persistence: Zustand persist middleware reads session on mount
```

**User data isolation**:
- Users stored in `movienest_users` localStorage key (array)
- Current session in `movienest_auth` (current user object + isAuthenticated flag)
- Favorites in `movienest_favorites_${userId}` per user
- Watchlist in `movienest_watchlist_${userId}` per user

**Alternatives considered**:
- Cookie-based session: Unnecessary complexity for demo
- JWT tokens: Overkill without a backend

---

### 8. Dark/Light Mode

**Decision**: `next-themes` library with Tailwind's `class` dark mode strategy.

**Rationale**:
- `next-themes` handles SSR-safe theme detection, localStorage persistence, and system preference fallback
- Prevents flash of incorrect theme via script injection in `_document.tsx`
- Tailwind's `dark:` variant makes styling straightforward
- shadcn/ui components respect dark mode natively via CSS variables

**Alternatives considered**:
- Custom context: Would require reimplementing flash prevention, system preference detection
- CSS `prefers-color-scheme` only: No user toggle capability

---

### 9. Image Handling

**Decision**: `next/image` with TMDB domain configuration and SVG fallback placeholders.

**Rationale**:
- `next/image` provides automatic optimization, lazy loading, responsive sizing
- TMDB image domains (`image.tmdb.org`) configured in `next.config.ts`
- Custom `ImageWithFallback` component handles missing posters/backdrops/profiles
- Fallback SVG placeholders for poster (2:3 ratio), backdrop (16:9 ratio), profile (1:1 ratio)

**TMDB image sizes used**:
- Poster: `w342` (grid), `w500` (details)
- Backdrop: `w780` (hero), `w1280` (details page)
- Profile: `w185` (cast list), `h632` (person details)

---

### 10. Icons

**Decision**: Lucide React icons.

**Rationale**: Lightweight, tree-shakeable, consistent design, explicitly required by the requirements.

## TMDB API Endpoints Needed

| Endpoint | Use Case |
|----------|----------|
| `GET /trending/movie/week` | Home page trending movies |
| `GET /trending/tv/week` | Home page trending TV shows |
| `GET /movie/popular` | Home page + Movies page |
| `GET /movie/top_rated` | Home page + Movies page sort |
| `GET /movie/upcoming` | Home page upcoming section |
| `GET /tv/popular` | Home page + TV page |
| `GET /tv/top_rated` | Home page + TV page sort |
| `GET /trending/person/week` | Home page popular people |
| `GET /discover/movie` | Movies page with genre/sort filters |
| `GET /discover/tv` | TV page with genre/sort filters |
| `GET /movie/{id}` | Movie details |
| `GET /movie/{id}/credits` | Movie cast & crew |
| `GET /movie/{id}/videos` | Movie trailers |
| `GET /movie/{id}/similar` | Similar movies |
| `GET /movie/{id}/recommendations` | Recommended movies |
| `GET /tv/{id}` | TV show details |
| `GET /tv/{id}/credits` | TV cast & crew |
| `GET /tv/{id}/videos` | TV trailers |
| `GET /tv/{id}/similar` | Similar TV shows |
| `GET /tv/{id}/recommendations` | Recommended TV shows |
| `GET /search/multi` | Multi-search (movie + TV + person) |
| `GET /search/movie` | Movie-only search |
| `GET /search/tv` | TV-only search |
| `GET /search/person` | Person-only search |
| `GET /person/{id}` | Person details |
| `GET /person/{id}/combined_credits` | Person filmography |
| `GET /genre/movie/list` | Movie genre list for filters |
| `GET /genre/tv/list` | TV genre list for filters |

## Resolved Unknowns

All NEEDS CLARIFICATION items have been resolved:

| Unknown | Resolution |
|---------|------------|
| TMDB rate limiting | Retry with exponential backoff + aggressive TanStack Query caching (from clarification session) |
| Auth method | Frontend-only localStorage demo auth (from requirements) |
| Router type | Pages Router only (from requirements) |
| Test strategy | Manual testing + linting + type checking (portfolio scope) |
| Image CDN | TMDB's own CDN via `image.tmdb.org` with `next/image` optimization |
