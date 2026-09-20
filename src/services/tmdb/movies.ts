import { get } from './client';
import { PaginatedResponse, Movie, MovieDetails, CreditsResponse, VideosResponse } from '@/types';

export const getTrendingMovies = (page: number = 1) =>
  get<PaginatedResponse<Movie>>('/api/tmdb/trending/movie/day', { page: page.toString() });

export const getPopularMovies = (page: number = 1) =>
  get<PaginatedResponse<Movie>>('/api/tmdb/movie/popular', { page: page.toString() });

export const getTopRatedMovies = (page: number = 1) =>
  get<PaginatedResponse<Movie>>('/api/tmdb/movie/top_rated', { page: page.toString() });

export const getUpcomingMovies = (page: number = 1) =>
  get<PaginatedResponse<Movie>>('/api/tmdb/movie/upcoming', { page: page.toString() });

export interface DiscoverParams {
  page?: number;
  genre?: number;
  sort?: string;
}

export const discoverMovies = ({ page = 1, genre, sort = 'popularity.desc' }: DiscoverParams = {}) => {
  const params: Record<string, string> = {
    page: page.toString(),
    sort_by: sort,
  };
  if (genre) params.with_genres = genre.toString();
  return get<PaginatedResponse<Movie>>('/api/tmdb/discover/movie', params);
};

export const getMovieDetails = (id: string | number) =>
  get<MovieDetails>(`/api/tmdb/movie/${id}`);

export const getMovieCredits = (id: string | number) =>
  get<CreditsResponse>(`/api/tmdb/movie/${id}/credits`);

export const getMovieVideos = (id: string | number) =>
  get<VideosResponse>(`/api/tmdb/movie/${id}/videos`);

export const getSimilarMovies = (id: string | number, page: number = 1) =>
  get<PaginatedResponse<Movie>>(`/api/tmdb/movie/${id}/similar`, { page: page.toString() });

export const getMovieRecommendations = (id: string | number, page: number = 1) =>
  get<PaginatedResponse<Movie>>(`/api/tmdb/movie/${id}/recommendations`, { page: page.toString() });
