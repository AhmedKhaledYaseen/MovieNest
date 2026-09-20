import { QueryClient } from "@tanstack/react-query";
import { STALE_TIMES } from "../utils/constants";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIMES.SHORT,
      gcTime: STALE_TIMES.LONG,
      retry: (failureCount) => failureCount < 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
  },
});
