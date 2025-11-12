import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface AuthUser {
  name: string;
  email: string;
  avatar: string;
}
interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (platform: 'instagram' | 'threads') => void;
  logout: () => void;
}
const MOCK_USERS: Record<'instagram' | 'threads', AuthUser> = {
    instagram: {
        name: 'Insta User',
        email: 'insta.user@pulsefeed.dev',
        avatar: 'https://i.pravatar.cc/150?u=instagram-user',
    },
    threads: {
        name: 'Threads User',
        email: 'threads.user@pulsefeed.dev',
        avatar: 'https://i.pravatar.cc/150?u=threads-user',
    }
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (platform) => set({
        isAuthenticated: true,
        user: MOCK_USERS[platform],
      }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'pulsefeed-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);