# API Route Contracts: MovieNest

**Date**: 2026-09-18 | **Plan**: [plan.md](file:///d:/Projects/Front-end/MovieNest/specs/001-movie-series-explorer/plan.md)

All API routes live under `pages/api/` and proxy requests to TMDB. The client NEVER contacts TMDB directly.

## Common Response Format

All API routes return JSON. On success, they return the TMDB response body directly. On error:

```json
{
  "error": "Human-readable error message",
  "status": 500
}
```

**HTTP status codes used**:
- `200` — Success
- `400` — Bad request (missing/invalid parameters)
- `404` — Resource not found on TMDB
- `405` — Method not allowed (only GET supported)
- `429` — Rate limited by TMDB (client should retry)
- `500` — Internal server error / TMDB unavailable

---

## Movie Endpoints

### GET `/api/movies/trending`

**Description**: Get trending movies for the week.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number (1–500) |

**Response**: `PaginatedResponse<Movie>`

---

### GET `/api/movies/popular`

**Description**: Get popular movies.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |

**Response**: `PaginatedResponse<Movie>`

---

### GET `/api/movies/top-rated`

**Description**: Get top-rated movies.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |

**Response**: `PaginatedResponse<Movie>`

---

### GET `/api/movies/upcoming`

**Description**: Get upcoming movies.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |

**Response**: `PaginatedResponse<Movie>`

---

### GET `/api/movies/discover`

**Description**: Discover movies with genre and sort filters.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| genre | number | — | Genre ID to filter by |
| sort | string | "popularity.desc" | Sort order (popularity.desc, popularity.asc, vote_average.desc, vote_average.asc, release_date.desc, release_date.asc) |

**Response**: `PaginatedResponse<Movie>`

---

### GET `/api/movies/[id]`

**Description**: Get detailed movie information.

**URL Parameters**:
| Param | Type | Description |
|-------|------|-------------|
| id | number | TMDB movie ID |

**Response**: `MovieDetails` (full movie object with tagline, runtime, budget, revenue, production_companies, etc.)

---

### GET `/api/movies/[id]/credits`

**Description**: Get movie cast and crew.

**URL Parameters**:
| Param | Type | Description |
|-------|------|-------------|
| id | number | TMDB movie ID |

**Response**: `CreditsResponse` (`{ id, cast: CastMember[], crew: CrewMember[] }`)

---

### GET `/api/movies/[id]/videos`

**Description**: Get movie trailers and clips.

**URL Parameters**:
| Param | Type | Description |
|-------|------|-------------|
| id | number | TMDB movie ID |

**Response**: `VideosResponse` (`{ id, results: Video[] }`)

---

### GET `/api/movies/[id]/similar`

**Description**: Get similar movies.

**URL Parameters**:
| Param | Type | Description |
|-------|------|-------------|
| id | number | TMDB movie ID |

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |

**Response**: `PaginatedResponse<Movie>`

---

### GET `/api/movies/[id]/recommendations`

**Description**: Get recommended movies.

**URL Parameters**:
| Param | Type | Description |
|-------|------|-------------|
| id | number | TMDB movie ID |

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |

**Response**: `PaginatedResponse<Movie>`

---

## TV Show Endpoints

### GET `/api/tv/trending`

**Description**: Get trending TV shows for the week.

**Query Parameters**: Same as movie trending.

**Response**: `PaginatedResponse<TVShow>`

---

### GET `/api/tv/popular`

**Description**: Get popular TV shows.

**Query Parameters**: Same as movie popular.

**Response**: `PaginatedResponse<TVShow>`

---

### GET `/api/tv/top-rated`

**Description**: Get top-rated TV shows.

**Query Parameters**: Same as movie top-rated.

**Response**: `PaginatedResponse<TVShow>`

---

### GET `/api/tv/discover`

**Description**: Discover TV shows with genre and sort filters.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| genre | number | — | Genre ID to filter by |
| sort | string | "popularity.desc" | Sort order |

**Response**: `PaginatedResponse<TVShow>`

---

### GET `/api/tv/[id]`

**Description**: Get detailed TV show information.

**URL Parameters**:
| Param | Type | Description |
|-------|------|-------------|
| id | number | TMDB TV show ID |

**Response**: `TVShowDetails` (full TV object with seasons, networks, number_of_episodes, etc.)

---

### GET `/api/tv/[id]/credits`

**Response**: `CreditsResponse`

---

### GET `/api/tv/[id]/videos`

**Response**: `VideosResponse`

---

### GET `/api/tv/[id]/similar`

**Response**: `PaginatedResponse<TVShow>`

---

### GET `/api/tv/[id]/recommendations`

**Response**: `PaginatedResponse<TVShow>`

---

## Search Endpoints

### GET `/api/search`

**Description**: Search across movies, TV shows, and/or people.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| q | string | — | Search query (required, min 1 char) |
| type | string | "multi" | Search type: "multi", "movie", "tv", "person" |
| page | number | 1 | Page number |

**Response**: `PaginatedResponse<Movie | TVShow | Person>` (each result has `media_type` discriminator)

**Validation**: Returns 400 if `q` is missing or empty.

---

## Person Endpoints

### GET `/api/person/[id]`

**Description**: Get person details including biography and filmography.

**URL Parameters**:
| Param | Type | Description |
|-------|------|-------------|
| id | number | TMDB person ID |

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| append | string | "combined_credits" | Append additional data (comma-separated) |

**Response**: `PersonDetails` (with `combined_credits` appended by default)

---

## Genre Endpoints

### GET `/api/genres/movie`

**Description**: Get list of movie genres.

**Response**: `{ genres: Genre[] }`

---

### GET `/api/genres/tv`

**Description**: Get list of TV show genres.

**Response**: `{ genres: Genre[] }`

---

## Trending Endpoints

### GET `/api/trending/all`

**Description**: Get all trending content (movies + TV) for the week.

**Query Parameters**:
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |

**Response**: `PaginatedResponse<Movie | TVShow>` (with `media_type` discriminator)
