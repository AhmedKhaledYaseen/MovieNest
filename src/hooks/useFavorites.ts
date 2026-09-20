import { useFavoritesStore } from '@/store/favoritesStore';
import { useAuth } from './useAuth';
import { FavoriteItem } from '@/types';
import { useNotificationStore } from '@/store/notificationStore';
import { toast } from 'sonner';

export const useFavorites = () => {
  const { user, isAuthenticated } = useAuth();
  const store = useFavoritesStore();

  const userId = user?.id || 'guest';
  const favorites = store.favoritesByUser[userId] || [];
  const { addNotification } = useNotificationStore();

  const handleAction = (action: () => void) => {
    if (!isAuthenticated) {
      addNotification('guest', 'Please log in to save favorites');
      return;
    }
    action();
  };

  const addFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    handleAction(() => {
      store.addFavorite(userId, item);
      addNotification(userId, `${item.title} added to favorites`);
      toast.success(`${item.title} added to favorites`);
    });
  };

  const removeFavorite = (id: number, mediaType: 'movie' | 'tv') => {
    handleAction(() => {
      store.removeFavorite(userId, id, mediaType);
      addNotification(userId, 'Removed from favorites');
      toast.success('Removed from favorites');
    });
  };

  const toggleFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    handleAction(() => {
      const isFav = store.isFavorite(userId, item.id, item.mediaType);
      store.toggleFavorite(userId, item);
      if (isFav) {
        addNotification(userId, `${item.title} removed from favorites`);
        toast.success(`${item.title} removed from favorites`);
      } else {
        addNotification(userId, `${item.title} added to favorites`);
        toast.success(`${item.title} added to favorites`);
      }
    });
  };

  const isFavorite = (id: number, mediaType: 'movie' | 'tv') => {
    if (!isAuthenticated) return false;
    return store.isFavorite(userId, id, mediaType);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites: () => isAuthenticated && store.clearFavorites(userId),
  };
};
