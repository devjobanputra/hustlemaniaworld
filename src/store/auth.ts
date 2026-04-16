// ============================================
// Hustle Mania — Auth Store (Zustand + Supabase)
// ============================================

import { create } from 'zustand';
import { supabase } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;

  // Modal State
  isModalOpen: boolean;
  view: 'login' | 'register';
  openModal: (view?: 'login' | 'register') => void;
  closeModal: () => void;
  setView: (view: 'login' | 'register') => void;
  
  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  isModalOpen: false,
  view: 'login',
  openModal: (view = 'login') => set({ isModalOpen: true, view }),
  closeModal: () => set({ isModalOpen: false }),
  setView: (view) => set({ view, error: null }),

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({
        user: session?.user ?? null,
        session: session ?? null,
        loading: false,
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          user: session?.user ?? null,
          session: session ?? null,
        });
      });
    } catch {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        set({ error: error.message, loading: false });
        return false;
      }
      set({
        user: data.user,
        session: data.session,
        loading: false,
      });
      return true;
    } catch {
      set({ error: 'An unexpected error occurred', loading: false });
      return false;
    }
  },

  signUp: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });
      if (error) {
        set({ error: error.message, loading: false });
        return false;
      }
      set({
        user: data.user,
        session: data.session,
        loading: false,
      });
      return true;
    } catch {
      set({ error: 'An unexpected error occurred', loading: false });
      return false;
    }
  },

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null, session: null, loading: false });
  },

  clearError: () => set({ error: null }),
}));
