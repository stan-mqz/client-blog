import type { StateCreator } from "zustand";
import type { AuthUser } from "../../types/userTypes";

export type UsersSlice = {
  isLoading: boolean;
  authError: string;
  setAuthError: (message: string) => void;
  userData: AuthUser | null;
  setUserData: (user: AuthUser | null) => void;
  isAuthenticated: boolean;
}

export const createUsersSlice: StateCreator<UsersSlice> = (set) => ({
  isLoading: false,
  authError: "",
  userData: null,
  isAuthenticated: false,
  
  setAuthError: (message) => {
    set({ authError: message });
    setTimeout(() => set({ authError: "" }), 3000);
  },
  
  setUserData: (user) =>
    set({
      userData: user,
      isAuthenticated: !!user,
    }),
});