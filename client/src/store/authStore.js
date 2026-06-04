import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  admin: null,
  token: localStorage.getItem('ht-token') || null,
  isAuthenticated: !!localStorage.getItem('ht-token'),

  login: (admin, token) => {
    localStorage.setItem('ht-token', token);
    set({ admin, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('ht-token');
    set({ admin: null, token: null, isAuthenticated: false });
  },

  setAdmin: (admin) => set({ admin }),
}));
