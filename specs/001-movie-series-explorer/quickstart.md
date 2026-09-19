# Quickstart Validation Guide: MovieNest

**Date**: 2026-09-18 | **Plan**: [plan.md](file:///d:/Projects/Front-end/MovieNest/specs/001-movie-series-explorer/plan.md)

## Prerequisites

1. **Node.js** 18.x or later installed
2. **TMDB API key** — obtain from [TMDB Settings > API](https://www.themoviedb.org/settings/api)
3. **Git** for version control

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/AhmedKhaledYaseen/MovieNest.git
cd MovieNest

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local and add your TMDB API key:
#   TMDB_API_KEY=your_api_key_here

# 4. Start the development server
npm run dev
```

The application should be running at `http://localhost:3000`.

## Validation Scenarios

### Scenario 1: Home Page Loads with TMDB Data

**Steps**:
1. Open `http://localhost:3000`
2. Verify the hero section displays a featured trending movie with backdrop, title, overview, rating, and action buttons
3. Scroll down to verify content rows load: Trending Movies, Trending TV Shows, Popular Movies, etc.
4. Hover over a movie card and verify the scale animation and metadata appear

**Expected outcome**: All sections render with real TMDB data. No blank screens. Skeleton loaders appear while data fetches.

---

### Scenario 2: Movie Browse & Filtering

**Steps**:
1. Navigate to `/movies`
2. Verify the movie grid loads with poster cards
3. Select a genre filter (e.g., "Action")
4. Verify URL updates to `/movies?genre=28`
5. Change sort to "Top Rated"
6. Click "Next" in pagination
7. Verify URL updates to include `&page=2`
8. Copy the full URL, open in new tab — verify same view loads

**Expected outcome**: Genre filter, sort, and pagination all work. URL stays in sync and is shareable.

---

### Scenario 3: Movie Details Page

**Steps**:
1. Click on any movie card to navigate to `/movies/[id]`
2. Verify all movie details render: backdrop, poster, title, tagline, overview, rating, runtime, genres, etc.
3. Scroll to Cast section — verify actor photos and character names appear
4. Click "Watch Trailer" — verify trailer modal opens with YouTube embed
5. Click "Add to Favorites" — if not logged in, verify a login prompt appears

**Expected outcome**: Rich detail page with all sections. Trailer modal works. Auth-gated actions prompt login.

---

### Scenario 4: TV Show Details & Seasons

**Steps**:
1. Navigate to `/tv`
2. Click a TV show to open `/tv/[id]`
3. Verify TV-specific fields: first/last air date, seasons, episodes, networks
4. Verify the Seasons section displays with season cards
5. Verify Similar Shows and Recommendations sections load

**Expected outcome**: TV detail page renders all fields. Seasons interface is clean and informative.

---

### Scenario 5: Search with Debounce

**Steps**:
1. Navigate to `/search`
2. Type "Inception" into the search bar
3. Open browser Network tab — verify only 1 API request fires (not one per keystroke)
4. Verify results appear after debounce delay
5. Switch search type to "TV" — verify results change
6. Switch to "Person" — verify actor/actress results appear
7. Verify URL updates to `/search?q=inception&type=movie`
8. Clear search — verify empty state appears

**Expected outcome**: Search is debounced (max 1 request per ~300ms of typing). Type filter works. URL is shareable.

---

### Scenario 6: User Registration & Login

**Steps**:
1. Navigate to `/register`
2. Try submitting with invalid data — verify validation errors appear
3. Register with: Name "Test User", Email "test@example.com", Password "password123"
4. Verify auto-login and redirect after successful registration
5. Log out via profile/navbar
6. Navigate to `/login`
7. Log in with "test@example.com" / "password123"
8. Refresh the page — verify session persists
9. Try registering with the same email — verify duplicate error

**Expected outcome**: Forms validate properly. Sessions persist. Duplicate emails are rejected.

---

### Scenario 7: Favorites & Watchlist (Authenticated)

**Steps**:
1. Log in as a registered user
2. Navigate to any movie detail page
3. Click "Add to Favorites" — verify toast notification
4. Click "Add to Watchlist" — verify toast notification
5. Navigate to `/favorites` — verify the movie appears
6. Navigate to `/watchlist` — verify the movie appears
7. Remove the movie from favorites — verify it disappears
8. Log out, log in as a different user — verify that user's favorites are empty (data isolation)

**Expected outcome**: Favorites and watchlist work per-user. Data is isolated between users. Toast feedback on actions.

---

### Scenario 8: Person Details & Filmography

**Steps**:
1. From a movie detail page, click on a cast member's name/photo
2. Verify navigation to `/person/[id]`
3. Verify profile image, name, biography, birthday, and place of birth render
4. Scroll to filmography — verify acting and crew credits are listed
5. Click on a movie in the filmography — verify it navigates to that movie's detail page

**Expected outcome**: Person page renders all available data. Filmography links back to movie/TV detail pages.

---

### Scenario 9: Dark/Light Mode

**Steps**:
1. Click the theme toggle in the navbar
2. Verify the entire UI switches themes smoothly
3. Refresh the page — verify the selected theme persists (no flash of wrong theme)
4. Clear localStorage theme key — refresh — verify system preference is respected

**Expected outcome**: Theme toggles smoothly, persists across refreshes, defaults to system preference.

---

### Scenario 10: Responsive Design

**Steps**:
1. Open Chrome DevTools and toggle device toolbar
2. Test at 320px (small mobile) — verify layout is usable
3. Test at 375px (iPhone) — verify movie cards stack vertically
4. Test at 768px (tablet) — verify 2–3 column grid
5. Test at 1024px (laptop) — verify desktop layout
6. Test at 1440px (large screen) — verify content doesn't stretch awkwardly
7. Test hamburger menu on mobile sizes — verify it opens and navigates correctly

**Expected outcome**: All pages are usable at all breakpoints. Grids adapt naturally. Mobile menu works.

---

### Scenario 11: Error & Edge Cases

**Steps**:
1. Navigate to `/movies/999999999` — verify a user-friendly 404/error page appears (not a crash)
2. Temporarily remove TMDB_API_KEY from `.env.local`, restart server — verify the app shows a configuration error
3. Visit `/favorites` while logged out — verify login redirect or auth prompt
4. Test a movie with no poster image — verify placeholder image appears (no broken image icon)

**Expected outcome**: All error states are handled gracefully with user-friendly messages.

---

### Scenario 12: SEO Metadata

**Steps**:
1. View page source of `/movies/550` — verify `<title>` contains the movie name
2. Verify `<meta name="description">` contains movie overview
3. Verify Open Graph tags (`og:title`, `og:description`, `og:image`) are present
4. Check homepage title is "MovieNest — Discover Movies & TV Shows" (or similar)

**Expected outcome**: Dynamic SEO metadata on all content pages.

---

## Build Verification

```bash
# Run TypeScript type checking
npx tsc --noEmit

# Run ESLint
npx eslint .

# Run production build
npm run build

# Verify no build errors
npm start
```

**Expected outcome**: Zero TypeScript errors. Zero critical ESLint errors. Production build succeeds.

## Code Quality Checks

- [ ] No `any` types (search codebase: `grep -r ": any" src/`)
- [ ] No hardcoded API keys (search: `grep -r "api_key" src/ pages/`)
- [ ] No console.log left in production code (search: `grep -r "console.log" src/`)
- [ ] No broken imports (verified by `tsc --noEmit`)
- [ ] No dead/unused code
- [ ] All components are reusable — no duplicated UI logic
