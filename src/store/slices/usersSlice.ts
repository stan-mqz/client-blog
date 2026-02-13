import type { StateCreator } from "zustand";
import type { AuthUser } from "../../types/userTypes";

export type UsersSlice = {
  isLoading: boolean;
  authError: string;
  settingsSucces: {
    message: string;
    field: string;
  };
  setAuthError: (message: string) => void;
  userData: AuthUser | null;
  setUserData: (user: Partial<AuthUser> | null) => void;
  settingsError: {
    message: string;
    field: string;
  };
  isAuthenticated: boolean;
  setSettingsSuccess: (message: string, field: string) => void;
  setSettingsError: (message: string, field: string) => void;
};

export const createUsersSlice: StateCreator<UsersSlice> = (set) => ({
  settingsSucces: {
    message: "",
    field: "",
  },
  settingsError: {
    message: "",
    field: "",
  },
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

  setSettingsError: (message, field) => {
    set({
      settingsError: {
        message,
        field,
      },
    });

    setTimeout(() => {
      set({
        settingsError: {
          message: "",
          field: "",
        },
      });
    }, 3000);
  },

  setSettingsSuccess: (message, field) => {
    set({
      settingsSucces: {
        message,
        field,
      },
    });

    setTimeout(() => {
      set({
        settingsSucces: {
          message: "",
          field: "",
        },
      });
    }, 3000);
  },
});
