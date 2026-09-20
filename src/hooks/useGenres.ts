import { useQuery } from '@tanstack/react-query';
import { getMovieGenres, getTVGenres } from '@/services/tmdb/genres';
import { STALE_TIMES } from '@/utils/constants';

export const useMovieGenres = () => {
  return useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: getMovieGenres,
    staleTime: STALE_TIMES.DAY,
  });
};

export const useTVGenres = () => {
  return useQuery({
    queryKey: ['genres', 'tv'],
    queryFn: getTVGenres,
    staleTime: STALE_TIMES.DAY,
  });
}
