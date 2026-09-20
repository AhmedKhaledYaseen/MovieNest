import { get } from './client';
import { PaginatedResponse, TVShow, TVShowDetails, CreditsResponse, VideosResponse } from '@/types';

export const getTrendingTVShows = (page: number = 1) =>
  get<PaginatedResponse<TVShow>>('/api/tmdb/trending/tv/day', { page: page.toString() });

export const getPopularTVShows = (page: number = 1) =>
  get<PaginatedResponse<TVShow>>('/api/tmdb/tv/popular', { page: page.toString() });

export const getTopRatedTVShows = (page: number = 1) =>
  get<PaginatedResponse<TVShow>>('/api/tmdb/tv/top_rated', { page: page.toString() });

export const getAiringTodayTVShows = (page: number = 1) =>
  get<PaginatedResponse<TVShow>>('/api/tmdb/tv/airing_today', { page: page.toString() });

export interface DiscoverTVParams {
  page?: number;
  genre?: number;
  sort?: string;
}

export const discoverTVShows = ({ page = 1, genre, sort = 'popularity.desc' }: DiscoverTVParams = {}) => {
  const params: Record<string, string> = {
    page: page.toString(),
    sort_by: sort,
  };
  if (genre) params.with_genres = genre.toString();
  return get<PaginatedResponse<TVShow>>('/api/tmdb/discover/tv', params);
};

export const getTVShowDetails = (id: string | number) =>
  get<TVShowDetails>(`/api/tmdb/tv/${id}`);

export const getTVShowCredits = (id: string | number) =>
  get<CreditsResponse>(`/api/tmdb/tv/${id}/credits`);

export const getTVShowVideos = (id: string | number) =>
  get<VideosResponse>(`/api/tmdb/tv/${id}/videos`);

export const getSimilarTVShows = (id: string | number, page: number = 1) =>
  get<PaginatedResponse<TVShow>>(`/api/tmdb/tv/${id}/similar`, { page: page.toString() });

export const getTVShowRecommendations = (id: string | number, page: number = 1) =>
  get<PaginatedResponse<TVShow>>(`/api/tmdb/tv/${id}/recommendations`, { page: page.toString() });
