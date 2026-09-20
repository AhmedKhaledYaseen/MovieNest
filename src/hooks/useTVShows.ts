import { useQuery } from '@tanstack/react-query';
import { 
  getTrendingTVShows, 
  getPopularTVShows, 
  getTopRatedTVShows, 
  getAiringTodayTVShows, 
  discoverTVShows,
  getTVShowDetails,
  getTVShowCredits,
  getTVShowVideos,
  getSimilarTVShows,
  getTVShowRecommendations
} from '@/services/tmdb/tv';
import { STALE_TIMES } from '@/utils/constants';

export const useTrendingTVShows = (page: number = 1) => {
  return useQuery({
    queryKey: ['tv', 'trending', page],
    queryFn: () => getTrendingTVShows(page),
    staleTime: STALE_TIMES.SHORT,
  });
};

export const usePopularTVShows = (page: number = 1) => {
  return useQuery({
    queryKey: ['tv', 'popular', page],
    queryFn: () => getPopularTVShows(page),
    staleTime: STALE_TIMES.LONG,
  });
};

export const useTopRatedTVShows = (page: number = 1) => {
  return useQuery({
    queryKey: ['tv', 'top_rated', page],
    queryFn: () => getTopRatedTVShows(page),
    staleTime: STALE_TIMES.DAY,
  });
};

export const useAiringTodayTVShows = (page: number = 1) => {
  return useQuery({
    queryKey: ['tv', 'airing_today', page],
    queryFn: () => getAiringTodayTVShows(page),
    staleTime: STALE_TIMES.SHORT,
  });
};

export const useDiscoverTVShows = (params: import('@/services/tmdb/tv').DiscoverTVParams) => {
  return useQuery({
    queryKey: ['tv', 'discover', params],
    queryFn: () => discoverTVShows(params),
    staleTime: STALE_TIMES.SHORT,
  });
};

export const useTVShowDetails = (id: string | number) => {
  return useQuery({
    queryKey: ['tv', id],
    queryFn: () => getTVShowDetails(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};

export const useTVShowCredits = (id: string | number) => {
  return useQuery({
    queryKey: ['tv', id, 'credits'],
    queryFn: () => getTVShowCredits(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};

export const useTVShowVideos = (id: string | number) => {
  return useQuery({
    queryKey: ['tv', id, 'videos'],
    queryFn: () => getTVShowVideos(id),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};

export const useSimilarTVShows = (id: string | number, page: number = 1) => {
  return useQuery({
    queryKey: ['tv', id, 'similar', page],
    queryFn: () => getSimilarTVShows(id, page),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};

export const useTVShowRecommendations = (id: string | number, page: number = 1) => {
  return useQuery({
    queryKey: ['tv', id, 'recommendations', page],
    queryFn: () => getTVShowRecommendations(id, page),
    staleTime: STALE_TIMES.LONG,
    enabled: !!id,
  });
};
