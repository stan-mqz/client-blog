import type { StateCreator } from "zustand";
import type { authUserData } from "../../types/userTypes";

export type UsersSlice = {
  isLoading: boolean;
  error: string;
  setError: (message: string) => void;
  userData: authUserData | null;
  setUserData: (user: authUserData | null) => void;
  isAuthenticated: boolean;
}

export const createUsersSlice: StateCreator<UsersSlice> = (set) => ({
  isLoading: false,
  error: "",
  userData: null,
  isAuthenticated: false,
  
  setError: (message) => {
    set({ error: message });
    setTimeout(() => set({ error: "" }), 3000);
  },
  
  setUserData: (user) =>
    set({
      userData: user,
      isAuthenticated: !!user,
    }),
});