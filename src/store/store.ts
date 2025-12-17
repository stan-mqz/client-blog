import { devtools, persist } from "zustand/middleware";
import type { authUserData } from "../types";
import { create } from "zustand";

interface GlobalStore {
  error: string;
  setError: (message: string) => void;
  userData: authUserData | null;
  setUserData: (user: authUserData | null) => void;
  isAuthenticated: boolean;
}

export const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      (set): GlobalStore => ({
        error: "",
        setError: (message) => {
          set({ error: message });
          setTimeout(() => set({ error: "" }), 3000);
        },

        userData: null,
        isAuthenticated: false,

        setUserData: (user) =>
          set({
            userData: user,
            isAuthenticated: !!user,
          }),
      }),
      {
        name: "global-store",
        partialize: (state) => ({
          userData: state.userData,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: "GlobalStore" }
  )
);
