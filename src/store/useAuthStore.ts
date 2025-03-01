import { create } from "zustand";

interface AuthState {
  id: number | null;
  memberId: string | null;
  nickname: string | null;
  role: string | null;
  setUser: (user: { id: number; memberId: string; nickname: string; role: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  id: null,
  memberId: null,
  nickname: null,
  role: null,
  setUser: (user) => set(user),
  logout: () =>
    set({
      id: null,
      memberId: null,
      nickname: null,
      role: null,
    }),
}));
