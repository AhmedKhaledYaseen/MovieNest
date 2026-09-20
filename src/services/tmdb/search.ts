import { get } from './client';
import { PaginatedResponse, Movie, TVShow, Person } from '@/types';

export type SearchResult = Movie | TVShow | Person;

export const searchMulti = (query: string, page: number = 1) =>
  get<PaginatedResponse<SearchResult>>('/api/tmdb/search/multi', { query, page: page.toString() });

export const searchMovies = (query: string, page: number = 1) =>
  get<PaginatedResponse<Movie>>('/api/tmdb/search/movie', { query, page: page.toString() });

export const searchTVShows = (query: string, page: number = 1) =>
  get<PaginatedResponse<TVShow>>('/api/tmdb/search/tv', { query, page: page.toString() });

export const searchPeople = (query: string, page: number = 1) =>
  get<PaginatedResponse<Person>>('/api/tmdb/search/person', { query, page: page.toString() });
