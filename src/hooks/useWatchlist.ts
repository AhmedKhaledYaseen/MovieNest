import { useWatchlistStore } from '@/store/watchlistStore';
import { useAuth } from './useAuth';
import { WatchlistItem } from '@/types';
import { toast } from 'sonner';

export const useWatchlist = () => {
  const { user, isAuthenticated } = useAuth();
  const store = useWatchlistStore();

  const userId = user?.id || 'guest';
  const watchlist = store.watchlistByUser[userId] || [];

  const handleAction = (action: () => void) => {
    if (!isAuthenticated) {
      toast.error('Please log in to save to your watchlist');
      return;
    }
    action();
  };

  const addWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    handleAction(() => {
      store.addWatchlist(userId, item);
      toast.success('Added to watchlist');
    });
  };

  const removeWatchlist = (id: number, mediaType: 'movie' | 'tv') => {
    handleAction(() => {
      store.removeWatchlist(userId, id, mediaType);
      toast.success('Removed from watchlist');
    });
  };

  const toggleWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    handleAction(() => {
      const isIn = store.isWatchlist(userId, item.id, item.mediaType);
      store.toggleWatchlist(userId, item);
      if (isIn) {
        toast.success('Removed from watchlist');
      } else {
        toast.success('Added to watchlist');
      }
    });
  };

  const isWatchlist = (id: number, mediaType: 'movie' | 'tv') => {
    if (!isAuthenticated) return false;
    return store.isWatchlist(userId, id, mediaType);
  };

  return {
    watchlist,
    addWatchlist,
    removeWatchlist,
    toggleWatchlist,
    isWatchlist,
    clearWatchlist: () => isAuthenticated && store.clearWatchlist(userId),
  };
};
