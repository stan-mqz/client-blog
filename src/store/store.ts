import { devtools, persist } from "zustand/middleware";
import type { userData } from "../types";
import { create } from "zustand";

interface GlobalStore {
  userData: userData | null;
  setUserData: (user: userData | null) => void;
  isAuthenticated: boolean;
}

export const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      (set): GlobalStore => ({
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
