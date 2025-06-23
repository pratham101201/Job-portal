import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user based on email
    let mockUser: User;
    if (email === 'admin@supermall.com') {
      mockUser = {
        id: 'admin-1',
        name: 'Mall Administrator',
        email: email,
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=150&h=150&fit=crop',
        createdAt: new Date('2023-01-01')
      };
    } else if (email === 'shop@supermall.com') {
      mockUser = {
        id: 'shop-1',
        name: 'Shop Owner',
        email: email,
        role: 'shop_owner',
        avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?w=150&h=150&fit=crop',
        createdAt: new Date('2023-02-01')
      };
    } else {
      mockUser = {
        id: 'customer-1',
        name: 'John Customer',
        email: email,
        role: 'customer',
        avatar: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?w=150&h=150&fit=crop',
        createdAt: new Date('2023-03-01')
      };
    }

    set({ user: mockUser, isAuthenticated: true });
  },

  register: async (userData) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      ...userData,
      createdAt: new Date()
    };

    set({ user: newUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null
    }));
  }
}));