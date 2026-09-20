import { useQuery } from '@tanstack/react-query';
import { 
  getTrendingMovies, 
  getPopularMovies, 
  getTopRatedMovies, 
  getUpcomingMovies, 
  discoverMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  getMovieRecommendations
} from '@/services/tmdb/movies';
import { STALE_TIMES } from '@/utils/constants';

export const useTrendingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'trending', page],
    queryFn: () => getTrendingMovies(page),
    staleTime: STALE_TIMES.SHORT,
  });
};

export const usePopularMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => getPopularMovies(page),
    staleTime: STALE_TIMES.LONG,
  });
};

export const useTopRatedMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'top_rated', page],
    queryFn: () => getTopRatedMovies(page),
    staleTime: STALE_TIMES.DAY,
  });
};

export const useUpcomingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => getUpcomingMovies(page),
    staleTime: STALE_TIMES.LONG,
  });
};

export const useDiscoverMovies = (params: import('@/services/tmdb/movies').DiscoverParams) => {
  return useQuery({
    queryKey: ['movies', 'discover', params],
    queryFn: () => discoverMovies(params),
    staleTime: STALE_TIMES.SHORT,
  });
};

export const useMovieDetails = (id: string | number) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};

export const useMovieCredits = (id: string | number) => {
  return useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => getMovieCredits(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};

export const useMovieVideos = (id: string | number) => {
  return useQuery({
    queryKey: ['movie', id, 'videos'],
    queryFn: () => getMovieVideos(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};

export const useSimilarMovies = (id: string | number, page: number = 1) => {
  return useQuery({
    queryKey: ['movie', id, 'similar', page],
    queryFn: () => getSimilarMovies(id, page),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};

export const useMovieRecommendations = (id: string | number, page: number = 1) => {
  return useQuery({
    queryKey: ['movie', id, 'recommendations', page],
    queryFn: () => getMovieRecommendations(id, page),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};
