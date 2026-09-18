# Prompt — Movie/Series Explorer

You are a senior Frontend Engineer specializing in **Next.js, React, TypeScript, and modern frontend architecture**.

Build a complete, polished, production-quality **Movie & TV Series Explorer** web application designed as a **portfolio project for a Frontend Developer job application**.

The application should demonstrate strong knowledge of React, Next.js, TypeScript, API integration, state management, responsive UI, accessibility, performance, reusable components, and clean code architecture.

## 1. Technology Stack

Use:

- Latest stable **Next.js**
- **Pages Router** — do NOT use the App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- TanStack Query
- TMDB API
- ESLint
- Prettier
- Lucide React icons
- localStorage for demo authentication and user-specific data

### Important

Because this project uses the **Pages Router**:

- Use `pages/`
- Use `pages/api/` for Next.js API Routes
- Do NOT use `app/`
- Do NOT use `app/api/`
- Do NOT use React Server Components
- Do NOT use App Router APIs such as `useRouter` from `next/navigation`
- Use Pages Router APIs such as `next/router`

---

# 2. Project Goal

Create a Netflix-inspired Movie/Series discovery platform where users can:

- Discover movies
- Discover TV shows
- Search movies and TV shows
- Filter and sort results
- View detailed movie information
- View detailed TV show information
- Explore actors/actresses
- Watch trailers
- See cast and crew
- Save favorites
- Create a watchlist
- Register and log in
- Manage a simple profile
- Switch between light and dark mode

The UI should feel **modern, cinematic, polished, and professional**, while remaining original and not directly copying Netflix's branding or UI.

---

# 3. Design Direction

Use a **Netflix-inspired cinematic design language**, but create an original interface.

Characteristics:

- Dark cinematic aesthetic
- Large movie backdrops
- Strong typography
- Large hero sections
- Movie poster grids
- Subtle gradients
- Smooth hover animations
- Rounded cards
- Modern navigation
- Strong visual hierarchy
- Responsive layouts
- Professional spacing
- High-quality loading states

Support:

- Light mode
- Dark mode
- System preference where appropriate

Use shadcn/ui components wherever they provide value.

Do not overuse cards, borders, shadows, or gradients.

The final UI should look like something that could realistically be presented in a frontend developer portfolio.

---

# 4. TMDB API

Use the **TMDB API** as the application's movie/TV data source.

The user will add the API key later.

Create:

```env
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

Also provide:

```text
.env.example
```

Never hardcode the API key.

---

# 5. API Architecture

Since the project uses the Pages Router, proxy TMDB requests through:

```text
pages/api/
```

For example:

```text
pages/api/movies/trending.ts
pages/api/movies/popular.ts
pages/api/movies/top-rated.ts
pages/api/movies/upcoming.ts
pages/api/movies/[id].ts

pages/api/tv/popular.ts
pages/api/tv/top-rated.ts
pages/api/tv/[id].ts

pages/api/search.ts

pages/api/person/[id].ts
```

You may simplify the API structure if a better architecture exists, but keep TMDB communication centralized and maintainable.

Create a reusable TMDB service layer.

For example:

```text
src/
├── services/
│   └── tmdb/
│       ├── client.ts
│       ├── movies.ts
│       ├── tv.ts
│       ├── search.ts
│       └── people.ts
```

API routes should use these services.

---

# 6. Data Fetching

Use **TanStack Query** for client-side server/API data.

Use it for:

- Search
- Movie lists
- TV lists
- Details
- Recommendations
- Similar content
- People
- Other remote API data

Configure:

- Query caching
- Appropriate stale times
- Loading states
- Error states
- Retry behavior
- Query invalidation where necessary

Avoid unnecessary API requests.

---

# 7. Zustand

Use Zustand for client-side application state.

Create appropriate stores, such as:

```text
src/store/
├── authStore.ts
├── favoritesStore.ts
├── watchlistStore.ts
└── uiStore.ts
```

Use Zustand for:

- Authentication state
- Current demo user
- Favorites
- Watchlist
- UI preferences where appropriate

Persist relevant state using localStorage.

Do not store remote TMDB data in Zustand when TanStack Query is more appropriate.

---

# 8. Authentication

Do NOT use:

- NextAuth
- Auth.js
- Firebase Authentication
- Clerk
- Supabase Auth
- Any external authentication provider

Implement **frontend-only demo authentication**.

### Register

Create a registration page.

User provides:

- Name
- Email
- Password
- Confirm password

Validate the form properly.

Store demo users in localStorage.

### Login

Create a login page.

User provides:

- Email
- Password

Validate credentials against the locally stored demo users.

After login:

- Store the current user
- Persist the session in localStorage
- Redirect to the intended page when appropriate

### Logout

Allow users to log out.

### Important security disclaimer

This is intentionally a **frontend-only demo authentication system** for portfolio purposes.

Do not present it as production-secure authentication.

Passwords stored in localStorage are acceptable only because this is a frontend portfolio/demo application.

Make the architecture easy to replace with a real authentication backend later.

---

# 9. User-specific Data

Favorites and watchlist should only be available to authenticated users.

Guests attempting to use them should receive a clear message such as:

> Please log in to save movies to your favorites.

Store user-specific data separately.

For example:

```text
users
currentUser
favorites
watchlist
```

Avoid allowing one demo user to accidentally see another user's favorites.

When a user logs out and another user logs in, their data should remain isolated.

---

# 10. Main Pages

Create the following pages.

## Home

```text
/
```

Include:

### Hero section

Display a featured/trending movie with:

- Backdrop
- Title
- Overview
- Rating
- Release year
- Genre
- Watch Trailer button
- View Details button

### Sections

Include:

- Trending Movies
- Trending TV Shows
- Popular Movies
- Popular TV Shows
- Top Rated Movies
- Top Rated TV Shows
- Upcoming Movies
- Popular People

Use horizontal content sections where appropriate.

---

# 11. Movies Page

```text
/movies
```

Include:

- Page heading
- Filter controls
- Genre filter
- Sort options
- Movie grid
- Pagination
- Loading skeletons
- Error state
- Empty state

Use traditional pagination.

URL query parameters should represent filters where appropriate:

```text
/movies?page=2&genre=28&sort=popularity.desc
```

This makes pages shareable and improves UX.

---

# 12. TV Shows Page

```text
/tv
```

Include:

- Popular TV shows
- Top-rated TV shows
- Genre filtering
- Sorting
- Pagination
- Responsive grid
- Loading states
- Error states

---

# 13. Search

Create:

```text
/search
```

Support searching for:

- Movies
- TV shows
- People

Include:

- Search input
- Debounced search
- Search suggestions if practical
- Search type filter
- Results grid/list
- Pagination
- Empty states

Use URL query parameters:

```text
/search?q=inception&type=movie&page=1
```

Search should be shareable through the URL.

Do not send a request for every keystroke.

Use debouncing.

---

# 14. Movie Details

Create:

```text
/movies/[id]
```

Display:

- Backdrop
- Poster
- Title
- Original title
- Tagline
- Overview
- Rating
- Vote count
- Release date
- Runtime
- Genres
- Status
- Production companies
- Budget if available
- Revenue if available

Actions:

- Add to Favorites
- Add to Watchlist
- Watch Trailer

Sections:

- Cast
- Crew
- Videos
- Similar Movies
- Recommendations

Use visually strong presentation.

---

# 15. TV Details

Create:

```text
/tv/[id]
```

Display:

- Backdrop
- Poster
- Title
- Overview
- Rating
- First air date
- Last air date
- Number of seasons
- Number of episodes
- Genres
- Status
- Networks

Include:

- Cast
- Crew
- Seasons
- Videos
- Similar Shows
- Recommendations

Create a clean seasons interface.

---

# 16. Person Details

Create:

```text
/person/[id]
```

Display:

- Profile image
- Name
- Biography
- Birthday if available
- Place of birth if available
- Known for
- Acting credits
- Crew credits where available

Create a filmography section.

---

# 17. Favorites

Create:

```text
/favorites
```

Requirements:

- Authenticated users only
- Movie favorites
- TV favorites
- Tabs/filter
- Remove from favorites
- Empty state
- Responsive grid

If the user is not authenticated, redirect them to login or display an appropriate authentication prompt.

---

# 18. Watchlist

Create:

```text
/watchlist
```

Requirements:

- Authenticated users only
- Movies
- TV shows
- Remove from watchlist
- Empty state
- Responsive grid

---

# 19. Authentication Pages

Create:

```text
/login
/register
```

Use polished forms.

Include:

- Form validation
- Loading states
- Error messages
- Success feedback
- Accessible labels
- Password visibility toggle
- Navigation between login/register

Use React Hook Form + Zod if appropriate.

---

# 20. Profile

Create:

```text
/profile
```

Display:

- User name
- Email
- Favorite count
- Watchlist count
- Logout button

Keep the profile simple because this is a frontend demo authentication system.

---

# 21. Navigation

Create a responsive navbar.

Desktop:

```text
Logo
Home
Movies
TV Shows
Search
Favorites
Watchlist
Theme toggle
Profile
```

Mobile:

- Hamburger menu
- Slide-out/mobile navigation
- Search access
- Theme toggle
- Profile/logout

Navbar should remain usable on all screen sizes.

---

# 22. Movie Card

Create a highly reusable:

```text
MovieCard
```

It should support both movies and TV shows where practical.

Display:

- Poster
- Title
- Rating
- Release year
- Media type
- Favorite button
- Watchlist button

On hover:

- Subtle scale animation
- Additional metadata
- Quick actions

Do not make animations excessive.

Cards should link to their respective details page.

---

# 23. Reusable Components

Create reusable components instead of duplicating UI.

Suggested structure:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── movies/
│   │   ├── MovieCard.tsx
│   │   ├── MovieGrid.tsx
│   │   ├── MovieHero.tsx
│   │   ├── MovieDetails.tsx
│   │   └── MovieFilters.tsx
│   │
│   ├── tv/
│   │   ├── TVCard.tsx
│   │   ├── TVGrid.tsx
│   │   ├── TVDetails.tsx
│   │   └── TVFilters.tsx
│   │
│   ├── search/
│   │   ├── SearchBar.tsx
│   │   ├── SearchResults.tsx
│   │   └── SearchFilters.tsx
│   │
│   ├── people/
│   │   ├── PersonCard.tsx
│   │   └── PersonDetails.tsx
│   │
│   ├── common/
│   │   ├── LoadingSkeleton.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Pagination.tsx
│   │   └── Rating.tsx
│   │
│   └── ui/
│       └── shadcn components
```

Adjust the structure when necessary, but maintain separation of concerns.

---

# 24. Suggested Project Structure

Use a professional structure such as:

```text
project-root/
│
├── pages/
│   ├── index.tsx
│   ├── movies/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   ├── tv/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   ├── search.tsx
│   ├── person/
│   │   └── [id].tsx
│   ├── favorites.tsx
│   ├── watchlist.tsx
│   ├── profile.tsx
│   ├── login.tsx
│   ├── register.tsx
│   │
│   └── api/
│       ├── movies/
│       ├── tv/
│       ├── search.ts
│       └── person/
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── utils/
│   └── constants/
│
├── public/
│
├── styles/
│
├── .env.example
├── eslint.config.*
├── prettier.config.*
├── next.config.*
├── tailwind.config.*
├── tsconfig.json
└── README.md
```

Do not blindly follow this structure if a better Pages Router structure exists. Keep the final architecture clean and understandable.

---

# 25. TypeScript

Use TypeScript strictly.

Create types for:

- Movie
- TVShow
- Person
- Genre
- CastMember
- CrewMember
- Season
- Episode
- Video
- Pagination response
- API responses
- User
- Authentication state
- Favorite item
- Watchlist item

Avoid:

```ts
any
```

unless absolutely unavoidable.

Prefer type-safe API responses.

---

# 26. Images

Use `next/image`.

Configure TMDB image domains correctly.

Handle:

- Missing poster
- Missing backdrop
- Missing profile image

Create fallback images/placeholders.

Avoid broken images.

---

# 27. Loading States

Every asynchronous page/component should have an appropriate loading state.

Use shadcn/ui Skeleton or custom skeleton components.

Examples:

- Movie grid skeleton
- Hero skeleton
- Details skeleton
- Cast skeleton
- Search skeleton

Avoid showing a blank screen while loading.

---

# 28. Error Handling

Implement good error handling.

Handle:

- TMDB API errors
- Network failures
- Invalid movie ID
- Invalid TV ID
- Invalid person ID
- Authentication errors
- Empty search results
- Missing images

Provide friendly user-facing error messages.

Do not expose raw API errors to users.

---

# 29. Pagination

Use traditional pagination.

Create a reusable:

```text
<Pagination />
```

component.

Support:

- Previous
- Next
- Current page
- Nearby page numbers
- Disabled states

Keep pagination synchronized with URL query parameters.

---

# 30. SEO

Implement appropriate SEO using the Pages Router's:

```text
next/head
```

Add dynamic metadata for:

- Movie pages
- TV pages
- Person pages

Include:

- Title
- Description
- Open Graph metadata where appropriate

Use meaningful page titles.

---

# 31. Accessibility

Follow good accessibility practices.

Include:

- Semantic HTML
- Accessible buttons
- Proper labels
- Keyboard navigation
- Focus states
- ARIA attributes where necessary
- Good color contrast
- Accessible dialogs
- Accessible mobile navigation

Do not rely only on icons to communicate actions.

---

# 32. Responsive Design

The application must work well on:

- Mobile
- Tablet
- Laptop
- Desktop
- Large screens

Test layouts around:

```text
320px
375px
768px
1024px
1280px
1440px+
```

Movie grids should adapt naturally.

---

# 33. Dark / Light Mode

Implement a polished theme system.

Requirements:

- Light mode
- Dark mode
- Theme toggle
- Persist preference
- Respect system preference when no preference exists

Avoid flash-of-incorrect-theme where practical.

---

# 34. UX Details

Include:

- Toast notifications
- Hover states
- Smooth transitions
- Skeleton loading
- Empty states
- Error states
- Confirmation where useful
- Debounced search
- Scroll-to-top behavior when appropriate
- Clear navigation
- Breadcrumbs where useful

Don't add animations simply for the sake of animation.

---

# 35. Security / Architecture

Even though this is a frontend-only authentication demo:

- Never expose TMDB API keys in client code
- Use environment variables
- Proxy TMDB requests through Next.js API routes
- Validate API route parameters
- Sanitize/validate user inputs
- Do not trust query parameters
- Keep API logic out of UI components

Clearly document in README that authentication is demo-only and localStorage-based.

---

# 36. Performance

Apply appropriate frontend performance practices:

- `next/image`
- Lazy loading
- Code splitting where useful
- Avoid unnecessary re-renders
- TanStack Query caching
- Debounced search
- Avoid duplicate API requests
- Memoization only where it actually helps
- Keep components reasonably small
- Avoid unnecessary global state
- Avoid loading data that isn't needed

Do not over-engineer optimization.

---

# 37. React Best Practices

Use:

- Functional components
- Custom hooks
- Proper dependency arrays
- Controlled forms where appropriate
- Reusable components
- Composition
- Clear separation between UI and data logic

Avoid:

- Huge components
- Duplicated logic
- Prop drilling when Zustand/context is appropriate
- Excessive `useEffect`
- Excessive global state
- Unnecessary memoization
- Unnecessary client-side fetching

---

# 38. Forms

Use:

- React Hook Form
- Zod

for login/register validation.

Examples:

```text
Email must be valid
Password minimum length
Confirm password must match
Name cannot be empty
```

Display validation errors clearly.

---

# 39. Demo Authentication Behavior

Create a small authentication abstraction so the implementation can later be replaced with a real backend.

For example:

```text
src/services/auth/
├── authService.ts
└── storage.ts
```

The UI should not directly manipulate localStorage everywhere.

Instead:

```text
Component
   ↓
Auth hook/store
   ↓
Auth service
   ↓
localStorage
```

Use the same principle for favorites/watchlist where appropriate.

---

# 40. No NextAuth

This is mandatory.

Do NOT install or use:

```text
next-auth
@auth/*
Auth.js
```

Authentication must remain frontend-only.

---

# 41. README

Create a professional README containing:

## Project Overview

Explain the project.

## Features

List major features.

## Tech Stack

Explain technologies used.

## Architecture

Explain:

- Pages Router
- API Routes
- TMDB service layer
- TanStack Query
- Zustand
- Authentication

## Environment Variables

Explain `.env.local`.

## Installation

Example:

```bash
npm install
npm run dev
```

## TMDB API Setup

Explain where to obtain the API key and where to put it.

## Authentication Disclaimer

Clearly state that authentication is frontend-only and intended for demonstration.

## Project Structure

Explain the main directories.

## Future Improvements

Mention possible upgrades such as:

- Real backend authentication
- Database
- Server-side authentication
- User profiles
- Reviews
- Social features

---

# 42. Code Quality Requirements

The final code should:

- Compile successfully
- Have no TypeScript errors
- Have no obvious ESLint errors
- Have no unnecessary `any`
- Have no broken imports
- Have no dead code
- Have no placeholder TODOs for core functionality
- Avoid duplicated logic
- Use reusable components
- Use clear naming
- Follow consistent formatting
- Be easy for another developer to understand

Do not generate pseudo-code.

Generate real, runnable code.

---

# 43. Important Implementation Rule

Do not create the entire application as one huge file.

Do not put all logic inside:

```text
pages/index.tsx
```

Separate:

- API logic
- Data fetching
- State
- UI
- Types
- Utilities
- Services

appropriately.

---

# 44. Portfolio Quality

Treat this as a project that will be shown to recruiters and technical interviewers.

The implementation should demonstrate knowledge of:

- React
- Next.js Pages Router
- TypeScript
- REST APIs
- API proxying
- TanStack Query
- Zustand
- Responsive design
- Tailwind CSS
- shadcn/ui
- Authentication concepts
- Form validation
- Error handling
- Loading states
- SEO
- Accessibility
- Performance
- Component architecture

The application should feel complete rather than like a tutorial project.

---

# 45. Final Acceptance Criteria

Before considering the project complete, verify that:

- [ ] Application runs successfully
- [ ] Pages Router is used
- [ ] No App Router is used
- [ ] No NextAuth is used
- [ ] TMDB API integration works
- [ ] TMDB API key is stored in environment variables
- [ ] TMDB API key is not exposed to the browser
- [ ] API proxy routes work
- [ ] Home page works
- [ ] Movies page works
- [ ] TV page works
- [ ] Search works
- [ ] Movie details work
- [ ] TV details work
- [ ] Person details work
- [ ] Favorites work
- [ ] Watchlist works
- [ ] Login works
- [ ] Registration works
- [ ] Logout works
- [ ] User data is isolated
- [ ] Authentication persists after refresh
- [ ] Light mode works
- [ ] Dark mode works
- [ ] Pagination works
- [ ] URL query parameters work
- [ ] Search is debounced
- [ ] Loading states exist
- [ ] Error states exist
- [ ] Empty states exist
- [ ] Responsive design works
- [ ] Accessibility has been considered
- [ ] SEO metadata exists
- [ ] TypeScript is properly typed
- [ ] No unnecessary `any`
- [ ] README is complete
- [ ] `.env.example` exists
- [ ] ESLint passes
- [ ] Application has no obvious runtime errors

---

## Development Approach

Build the application incrementally.

Start with:

1. Project setup
2. Tailwind + shadcn/ui
3. TMDB service/API architecture
4. TypeScript types
5. TanStack Query configuration
6. Zustand stores
7. Layout/navbar/theme
8. Authentication
9. Home page
10. Movies
11. TV shows
12. Search
13. Details pages
14. Favorites/watchlist
15. Person pages
16. SEO/accessibility/performance improvements
17. Final cleanup
18. README

After each major stage, make sure the project remains runnable and does not introduce broken imports or inconsistent architecture.

**Do not change the chosen architecture without a strong technical reason.**

The final result should be a polished, responsive, maintainable **Movie & Series Explorer portfolio application built with Next.js Pages Router, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand, and TMDB API, with frontend-only localStorage authentication and no NextAuth.**
