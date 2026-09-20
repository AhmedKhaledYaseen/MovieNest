import { useFavoritesStore } from '@/store/favoritesStore';
import { useAuth } from './useAuth';
import { FavoriteItem } from '@/types';
import { toast } from 'sonner';

export const useFavorites = () => {
  const { user, isAuthenticated } = useAuth();
  const store = useFavoritesStore();

  const userId = user?.id || 'guest';
  const favorites = store.favoritesByUser[userId] || [];

  const handleAction = (action: () => void) => {
    if (!isAuthenticated) {
      toast.error('Please log in to save favorites');
      return;
    }
    action();
  };

  const addFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    handleAction(() => {
      store.addFavorite(userId, item);
      toast.success('Added to favorites');
    });
  };

  const removeFavorite = (id: number, mediaType: 'movie' | 'tv') => {
    handleAction(() => {
      store.removeFavorite(userId, id, mediaType);
      toast.success('Removed from favorites');
    });
  };

  const toggleFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    handleAction(() => {
      const isFav = store.isFavorite(userId, item.id, item.mediaType);
      store.toggleFavorite(userId, item);
      if (isFav) {
        toast.success('Removed from favorites');
      } else {
        toast.success('Added to favorites');
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
