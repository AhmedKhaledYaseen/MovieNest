import { RegisterData, LoginData, AuthResponse } from '@/types';
import { saveUser, findUserByEmail, isEmailTaken } from './storage';

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (isEmailTaken(data.email)) {
    return { success: false, error: 'Email is already registered' };
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email.toLowerCase(),
    password: data.password, 
    createdAt: new Date().toISOString(),
  };

  saveUser(newUser);

  const { password: _password, ...userWithoutPassword } = newUser;
  return { success: true, user: userWithoutPassword };
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = findUserByEmail(data.email);

  if (!user || user.password !== data.password) {
    return { success: false, error: 'Invalid email or password' };
  }

  const { password: _password, ...userWithoutPassword } = user;
  return { success: true, user: userWithoutPassword };
};

export const validateSession = () => {
  return true;
};
