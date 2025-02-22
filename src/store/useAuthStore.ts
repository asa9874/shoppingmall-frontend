import { create } from "zustand";

interface AuthState {
  nickname: string | null;
  setNickname: (nickname: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  nickname: null,
  setNickname: (nickname) => set({ nickname }),
  logout: () => {
    localStorage.removeItem("token"); 
    set({ nickname: null });
  },
}));
