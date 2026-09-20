import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FavoriteItem } from '@/types';

interface FavoritesState {
  favoritesByUser: Record<string, FavoriteItem[]>;
  addFavorite: (userId: string, item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFavorite: (userId: string, id: number, mediaType: 'movie' | 'tv') => void;
  isFavorite: (userId: string, id: number, mediaType: 'movie' | 'tv') => boolean;
  toggleFavorite: (userId: string, item: Omit<FavoriteItem, 'addedAt'>) => void;
  clearFavorites: (userId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoritesByUser: {},

      addFavorite: (userId, item) => {
        const userFavorites = get().favoritesByUser[userId] || [];
        const exists = userFavorites.some((f) => f.id === item.id && f.mediaType === item.mediaType);
        
        if (!exists) {
          set((state) => ({
            favoritesByUser: {
              ...state.favoritesByUser,
              [userId]: [...userFavorites, { ...item, addedAt: new Date().toISOString() }],
            },
          }));
        }
      },

      removeFavorite: (userId, id, mediaType) => {
        const userFavorites = get().favoritesByUser[userId] || [];
        set((state) => ({
          favoritesByUser: {
            ...state.favoritesByUser,
            [userId]: userFavorites.filter((f) => !(f.id === id && f.mediaType === mediaType)),
          },
        }));
      },

      isFavorite: (userId, id, mediaType) => {
        const userFavorites = get().favoritesByUser[userId] || [];
        return userFavorites.some((f) => f.id === id && f.mediaType === mediaType);
      },

      toggleFavorite: (userId, item) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(userId, item.id, item.mediaType)) {
          removeFavorite(userId, item.id, item.mediaType);
        } else {
          addFavorite(userId, item);
        }
      },

      clearFavorites: (userId) => {
        set((state) => ({
          favoritesByUser: {
            ...state.favoritesByUser,
            [userId]: [],
          },
        }));
      },
    }),
    {
      name: 'movienest_favorites_all',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
