import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, login, register, logout } = useAuthStore();

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
};
