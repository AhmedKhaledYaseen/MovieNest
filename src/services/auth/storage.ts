import { User } from '@/types';

const USERS_KEY = 'movienest_users';

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const saveUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const isEmailTaken = (email: string): boolean => {
  return !!findUserByEmail(email);
};
