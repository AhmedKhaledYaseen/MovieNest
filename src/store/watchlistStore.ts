import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WatchlistItem } from '@/types';

interface WatchlistState {
  watchlistByUser: Record<string, WatchlistItem[]>;
  addWatchlist: (userId: string, item: Omit<WatchlistItem, 'addedAt'>) => void;
  removeWatchlist: (userId: string, id: number, mediaType: 'movie' | 'tv') => void;
  isWatchlist: (userId: string, id: number, mediaType: 'movie' | 'tv') => boolean;
  toggleWatchlist: (userId: string, item: Omit<WatchlistItem, 'addedAt'>) => void;
  clearWatchlist: (userId: string) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlistByUser: {},

      addWatchlist: (userId, item) => {
        const userWatchlist = get().watchlistByUser[userId] || [];
        const exists = userWatchlist.some((w) => w.id === item.id && w.mediaType === item.mediaType);
        
        if (!exists) {
          set((state) => ({
            watchlistByUser: {
              ...state.watchlistByUser,
              [userId]: [...userWatchlist, { ...item, addedAt: new Date().toISOString() }],
            },
          }));
        }
      },

      removeWatchlist: (userId, id, mediaType) => {
        const userWatchlist = get().watchlistByUser[userId] || [];
        set((state) => ({
          watchlistByUser: {
            ...state.watchlistByUser,
            [userId]: userWatchlist.filter((w) => !(w.id === id && w.mediaType === mediaType)),
          },
        }));
      },

      isWatchlist: (userId, id, mediaType) => {
        const userWatchlist = get().watchlistByUser[userId] || [];
        return userWatchlist.some((w) => w.id === id && w.mediaType === mediaType);
      },

      toggleWatchlist: (userId, item) => {
        const { isWatchlist, addWatchlist, removeWatchlist } = get();
        if (isWatchlist(userId, item.id, item.mediaType)) {
          removeWatchlist(userId, item.id, item.mediaType);
        } else {
          addWatchlist(userId, item);
        }
      },

      clearWatchlist: (userId) => {
        set((state) => ({
          watchlistByUser: {
            ...state.watchlistByUser,
            [userId]: [],
          },
        }));
      },
    }),
    {
      name: 'movienest_watchlist_all',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
