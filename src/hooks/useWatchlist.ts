import { useWatchlistStore } from '@/store/watchlistStore';
import { useAuth } from './useAuth';
import { WatchlistItem } from '@/types';
import { useNotificationStore } from '@/store/notificationStore';
import { toast } from 'sonner';

export const useWatchlist = () => {
  const { user, isAuthenticated } = useAuth();
  const store = useWatchlistStore();

  const userId = user?.id || 'guest';
  const watchlist = store.watchlistByUser[userId] || [];
  const { addNotification } = useNotificationStore();

  const handleAction = (action: () => void) => {
    if (!isAuthenticated) {
      addNotification('guest', 'Please log in to save to your watchlist');
      return;
    }
    action();
  };

  const addWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    handleAction(() => {
      store.addWatchlist(userId, item);
      addNotification(userId, `${item.title} added to watchlist`);
      toast.success(`${item.title} added to watchlist`);
    });
  };

  const removeWatchlist = (id: number, mediaType: 'movie' | 'tv') => {
    handleAction(() => {
      store.removeWatchlist(userId, id, mediaType);
      addNotification(userId, 'Removed from watchlist');
      toast.success('Removed from watchlist');
    });
  };

  const toggleWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    handleAction(() => {
      const isIn = store.isWatchlist(userId, item.id, item.mediaType);
      store.toggleWatchlist(userId, item);
      if (isIn) {
        addNotification(userId, `${item.title} removed from watchlist`);
        toast.success(`${item.title} removed from watchlist`);
      } else {
        addNotification(userId, `${item.title} added to watchlist`);
        toast.success(`${item.title} added to watchlist`);
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
