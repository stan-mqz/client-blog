import type { StateCreator } from "zustand";
import type { AuthUser } from "../../types/userTypes";

export type UsersSlice = {
  isLoading: boolean;
  authError: string;
  settingsSucces: string;
  setAuthError: (message: string) => void;
  userData: AuthUser | null;
  setUserData: (user: Partial<AuthUser> | null) => void;
  settingsError: string;
  isAuthenticated: boolean;
  setSettingsSuccess: (message: string) => void;
  setSettingsError: (message: string) => void;
};

export const createUsersSlice: StateCreator<UsersSlice> = (set) => ({
  settingsSucces: "",
  settingsError: "",
  isLoading: false,
  authError: "",
  userData: null,
  isAuthenticated: false,

  setAuthError: (message) => {
    set({ authError: message });
    setTimeout(() => set({ authError: "" }), 3000);
  },

  setUserData: (user) =>
    set((state) => ({
      userData:
        user === null
          ? null
          : state.userData
            ? { ...state.userData, ...user }
            : (user as AuthUser),
      isAuthenticated: !!user,
    })),

  setSettingsError: (message) => {
    set({ settingsError: message });

    setTimeout(() => {
      set({ settingsError: "" });
    }, 3000);
  },

  setSettingsSuccess: (message) => {
    set({ settingsSucces: message });

    setTimeout(() => {
      set({ settingsSucces: "" });
    }, 3000);
  },
});
