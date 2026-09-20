import { get } from './client';
import { Genre } from '@/types';

export const getMovieGenres = () =>
  get<{ genres: Genre[] }>('/api/tmdb/genre/movie/list');

export const getTVGenres = () =>
  get<{ genres: Genre[] }>('/api/tmdb/genre/tv/list');
