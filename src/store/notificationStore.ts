import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  message: string;
  createdAt: number;
  read: boolean;
}

interface NotificationState {
  notificationsByUser: Record<string, Notification[]>;
  addNotification: (userId: string, message: string) => void;
  markAsRead: (userId: string) => void;
  deleteNotification: (userId: string, notificationId: string) => void;
  clearNotifications: (userId: string) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notificationsByUser: {},
      addNotification: (userId, message) => set((state) => {
        const userNotifs = state.notificationsByUser[userId] || [];
        const newNotif: Notification = {
          id: Date.now().toString() + Math.random().toString(36).substring(7),
          message,
          createdAt: Date.now(),
          read: false,
        };
        return {
          notificationsByUser: {
            ...state.notificationsByUser,
            [userId]: [newNotif, ...userNotifs].slice(0, 50),
          },
        };
      }),
      markAsRead: (userId) => set((state) => {
        const userNotifs = state.notificationsByUser[userId] || [];
        return {
          notificationsByUser: {
            ...state.notificationsByUser,
            [userId]: userNotifs.map(n => ({ ...n, read: true })),
          },
        };
      }),
      deleteNotification: (userId, notificationId) => set((state) => {
        const userNotifs = state.notificationsByUser[userId] || [];
        return {
          notificationsByUser: {
            ...state.notificationsByUser,
            [userId]: userNotifs.filter(n => n.id !== notificationId),
          },
        };
      }),
      clearNotifications: (userId) => set((state) => ({
        notificationsByUser: {
          ...state.notificationsByUser,
          [userId]: [],
        },
      })),
    }),
    {
      name: 'movienest-notifications',
    }
  )
);
