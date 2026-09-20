# MovieNest

MovieNest is a modern web application built with Next.js that allows users to explore, search, and discover movies, TV shows, and actors. Users can create accounts to save their favorite content and maintain watchlists.

**Live Demo:** [https://movie-nest-three-ruddy.vercel.app](https://movie-nest-three-ruddy.vercel.app)

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui & Radix UI
- **State Management**: Zustand (Auth, Favorites, Watchlist, UI state)
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **API**: TMDB (The Movie Database) API proxy

## Features

- **Discover**: Browse trending, popular, and top-rated movies and TV shows.
- **Search**: Multi-search across movies, TV shows, and people.
- **Details**: In-depth information including cast, crew, trailers, and similar content.
- **Authentication**: Local storage-based authentication system.
- **Favorites & Watchlist**: Save content to personalized lists.
- **Dark Mode**: Smooth transition between light and dark themes.
- **Responsive**: Fully optimized for mobile, tablet, and desktop devices.
- **Accessible**: WCAG 2.1 AA compliant with proper ARIA attributes.

## Prerequisites

- Node.js (v18.17.0 or newer)
- npm, yarn, pnpm, or bun

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AhmedKhaledYaseen/MovieNest.git
   cd MovieNest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   ```
   You can get an API key by registering at [TMDB](https://www.themoviedb.org/).

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `pages/`: Next.js page components and API routes (`api/tmdb/[...path].ts`).
- `src/components/`: Reusable React components organized by domain (`auth`, `layout`, `media`, `ui`, `common`).
- `src/hooks/`: Custom React hooks, heavily utilizing TanStack Query for data fetching.
- `src/services/`: API client services for communicating with the internal proxy.
- `src/store/`: Zustand global state management.
- `src/types/`: TypeScript definitions for the data model.
- `src/utils/`: Helper functions (formatting, dates, URLs).
- `specs/`: Project specifications and design documents.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built production server.
- `npm run lint`: Runs ESLint to catch issues.

## Acknowledgements

- Data provided by [TMDB](https://www.themoviedb.org/).
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).
