import { useQuery } from '@tanstack/react-query';
import { searchMulti, searchMovies, searchTVShows, searchPeople } from '@/services/tmdb/search';
import { STALE_TIMES } from '@/utils/constants';

export const useSearch = (query: string, type: 'multi' | 'movie' | 'tv' | 'person' = 'multi', page: number = 1) => {
  return useQuery({
    queryKey: ['search', query, type, page],
    queryFn: () => {
      switch (type) {
        case 'movie':
          return searchMovies(query, page);
        case 'tv':
          return searchTVShows(query, page);
        case 'person':
          return searchPeople(query, page);
        case 'multi':
        default:
          return searchMulti(query, page);
      }
    },
    staleTime: STALE_TIMES.SHORT,
    enabled: !!query && query.trim().length > 0,
  });
};
