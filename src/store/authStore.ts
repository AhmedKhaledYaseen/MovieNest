import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, LoginData, RegisterData } from '@/types';
import { login as loginService, register as registerService } from '@/services/auth/authService';

interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (data: LoginData) => {
        const response = await loginService(data);
        if (response.success && response.user) {
          set({ user: response.user, isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: response.error };
      },

      register: async (data: RegisterData) => {
        const response = await registerService(data);
        if (response.success && response.user) {
          set({ user: response.user, isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: response.error };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'movienest_auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
