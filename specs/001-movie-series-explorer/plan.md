# Implementation Plan: MovieNest — Movie & TV Series Explorer

**Branch**: `001-movie-series-explorer` | **Date**: 2026-09-18 | **Spec**: [spec.md](file:///d:/Projects/Front-end/MovieNest/specs/001-movie-series-explorer/spec.md)

**Input**: Feature specification from `specs/001-movie-series-explorer/spec.md`

## Summary

Build a Netflix-inspired Movie & TV Series Explorer called MovieNest — a portfolio-quality Next.js (Pages Router) web application with TMDB API integration, TanStack Query for data fetching, Zustand for state management, Tailwind CSS + shadcn/ui for styling, frontend-only localStorage authentication, favorites/watchlist management, and a polished cinematic dark/light UI. The application demonstrates advanced frontend skills for a developer portfolio.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), Next.js 14.x (Pages Router)

**Primary Dependencies**:
- Next.js (Pages Router — NOT App Router)
- React 18.x
- TypeScript (strict)
- Tailwind CSS
- shadcn/ui
- Zustand (client state)
- TanStack Query v5 (server state / data fetching)
- React Hook Form + Zod (form validation)
- Lucide React (icons)
- next-themes (dark/light mode)

**Storage**: localStorage (demo authentication, favorites, watchlist, theme preference) — no database

**Testing**: Manual verification + ESLint + TypeScript strict compilation

**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge) — desktop and mobile

**Project Type**: Web application (Next.js Pages Router)

**Performance Goals**:
- Content discovery within 3 seconds of page load
- Search results within 5 seconds of query
- No blank screens — skeleton loading within 200ms
- Debounced search — max 1 request per 300ms of typing

**Constraints**:
- Pages Router ONLY — no App Router, no React Server Components
- No NextAuth / Auth.js / Firebase Auth / Clerk / Supabase Auth
- TMDB API key MUST never be exposed to client-side code
- TMDB API rate limit: ~40 requests / 10 seconds — handle with retry + caching

**Scale/Scope**: Portfolio project — single user at a time, ~15 pages, ~40+ components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Architecture-First Design | ✅ PASS | Clear separation: pages → hooks → services → API routes → TMDB. Component-based architecture. |
| II. Production-Grade Code Quality | ✅ PASS | TypeScript strict mode, ESLint, Prettier, no `any`, meaningful naming. |
| III. Comprehensive Error Handling | ✅ PASS | FR-022 mandates graceful error handling; edge cases documented for all failure modes. |
| IV. Performance-Conscious Implementation | ✅ PASS | TanStack Query caching, debounced search, lazy loading, next/image, code splitting. |
| V. Security by Default | ✅ PASS | API key proxied through API routes; input validation; auth is demo-only but architecturally clean. |
| VI. Accessibility (NON-NEGOTIABLE) | ✅ PASS | WCAG 2.1 AA required; semantic HTML, keyboard nav, ARIA, contrast ratios all specified. |
| VII. User Experience Excellence | ✅ PASS | Skeleton loading, empty states, error states, smooth animations, responsive design. |
| VIII. Comprehensive Testing | ⚠️ PARTIAL | Manual testing + linting + type checks only; no automated test suite (portfolio scope). |
| IX. Documentation & Self-Documenting Code | ✅ PASS | Professional README, JSDoc, inline documentation planned. |
| X. Simplicity & Pragmatism | ✅ PASS | Standard library solutions, no premature abstraction, well-maintained dependencies. |

**Gate Result**: ✅ PASS — Principle VIII is partial (no automated tests) which is acceptable for a frontend portfolio demo project. The requirements explicitly define manual acceptance criteria.

## Project Structure

### Documentation (this feature)

```text
specs/001-movie-series-explorer/
├── plan.md              # This file
├── research.md          # Phase 0 output — technology decisions
├── data-model.md        # Phase 1 output — entity definitions
├── contracts/           # Phase 1 output — API route contracts
│   ├── api-routes.md    # Next.js API route definitions
│   └── tmdb-service.md  # TMDB service layer interface
├── quickstart.md        # Phase 1 output — validation guide
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
project-root/
│
├── pages/                          # Next.js Pages Router
│   ├── _app.tsx                    # App wrapper (providers, layout)
│   ├── _document.tsx               # Custom document (theme script)
│   ├── index.tsx                   # Home page
│   ├── movies/
│   │   ├── index.tsx               # Movies browse page
│   │   └── [id].tsx                # Movie details page
│   ├── tv/
│   │   ├── index.tsx               # TV shows browse page
│   │   └── [id].tsx                # TV show details page
│   ├── search.tsx                  # Search page
│   ├── person/
│   │   └── [id].tsx                # Person details page
│   ├── favorites.tsx               # Favorites page (auth required)
│   ├── watchlist.tsx               # Watchlist page (auth required)
│   ├── profile.tsx                 # Profile page (auth required)
│   ├── login.tsx                   # Login page
│   ├── register.tsx                # Registration page
│   └── api/                        # API proxy routes
│       ├── movies/
│       │   ├── trending.ts
│       │   ├── popular.ts
│       │   ├── top-rated.ts
│       │   ├── upcoming.ts
│       │   ├── [id]/
│       │   │   ├── index.ts
│       │   │   ├── credits.ts
│       │   │   ├── videos.ts
│       │   │   ├── similar.ts
│       │   │   └── recommendations.ts
│       │   └── discover.ts
│       ├── tv/
│       │   ├── popular.ts
│       │   ├── top-rated.ts
│       │   ├── trending.ts
│       │   ├── [id]/
│       │   │   ├── index.ts
│       │   │   ├── credits.ts
│       │   │   ├── videos.ts
│       │   │   ├── similar.ts
│       │   │   └── recommendations.ts
│       │   └── discover.ts
│       ├── search.ts
│       ├── person/
│       │   └── [id].ts
│       ├── genres/
│       │   ├── movie.ts
│       │   └── tv.ts
│       └── trending/
│           └── all.ts
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Layout.tsx
│   │   ├── media/
│   │   │   ├── MediaCard.tsx         # Unified movie/TV card
│   │   │   ├── MediaGrid.tsx
│   │   │   ├── MediaHero.tsx
│   │   │   ├── MediaRow.tsx          # Horizontal scrollable row
│   │   │   ├── MediaDetails.tsx
│   │   │   └── MediaFilters.tsx
│   │   ├── people/
│   │   │   ├── PersonCard.tsx
│   │   │   ├── PersonDetails.tsx
│   │   │   └── Filmography.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   └── SearchFilters.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── common/
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Rating.tsx
│   │   │   ├── TrailerModal.tsx
│   │   │   ├── ImageWithFallback.tsx
│   │   │   └── ScrollToTop.tsx
│   │   └── ui/                       # shadcn/ui components
│   │       └── (button, card, dialog, dropdown, input, skeleton, toast, etc.)
│   │
│   ├── hooks/
│   │   ├── useMovies.ts
│   │   ├── useTVShows.ts
│   │   ├── useSearch.ts
│   │   ├── usePerson.ts
│   │   ├── useGenres.ts
│   │   ├── useFavorites.ts
│   │   ├── useWatchlist.ts
│   │   ├── useAuth.ts
│   │   └── useDebounce.ts
│   │
│   ├── services/
│   │   ├── tmdb/
│   │   │   ├── client.ts             # Axios/fetch client for internal API
│   │   │   ├── movies.ts
│   │   │   ├── tv.ts
│   │   │   ├── search.ts
│   │   │   ├── people.ts
│   │   │   └── genres.ts
│   │   └── auth/
│   │       ├── authService.ts
│   │       └── storage.ts
│   │
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── favoritesStore.ts
│   │   ├── watchlistStore.ts
│   │   └── uiStore.ts
│   │
│   ├── types/
│   │   ├── movie.ts
│   │   ├── tv.ts
│   │   ├── person.ts
│   │   ├── genre.ts
│   │   ├── auth.ts
│   │   ├── common.ts                 # Pagination, API responses
│   │   └── index.ts                  # Re-exports
│   │
│   ├── utils/
│   │   ├── tmdb.ts                   # Image URL helpers, formatters
│   │   ├── date.ts
│   │   ├── validation.ts
│   │   └── constants.ts
│   │
│   ├── lib/
│   │   ├── queryClient.ts            # TanStack Query client config
│   │   └── tmdbServer.ts             # Server-side TMDB fetch (for API routes)
│   │
│   └── styles/
│       └── globals.css
│
├── public/
│   ├── images/
│   │   ├── placeholder-poster.svg
│   │   ├── placeholder-backdrop.svg
│   │   └── placeholder-profile.svg
│   └── favicon.ico
│
├── .env.local                         # TMDB_API_KEY (gitignored)
├── .env.example                       # Template for env vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.mjs
├── postcss.config.mjs
├── package.json
└── README.md
```

**Structure Decision**: Next.js Pages Router with `pages/` for routing and `src/` for application code. This follows the hybrid pattern recommended in the requirements: pages handle routing and data flow orchestration, while `src/` contains all reusable components, hooks, services, stores, types, and utilities. API routes in `pages/api/` proxy TMDB requests to keep the API key server-side.

## Complexity Tracking

No constitution violations requiring justification.
