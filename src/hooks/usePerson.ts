import { useQuery } from '@tanstack/react-query';
import { getPersonDetails } from '@/services/tmdb/people';
import { STALE_TIMES } from '@/utils/constants';

export const usePersonDetails = (id: string | number) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => getPersonDetails(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};
