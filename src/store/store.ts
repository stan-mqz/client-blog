import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createUsersSlice, type UsersSlice } from "./slices/usersSlice";
import { createPostsSlice, type PostsSlice } from "./slices/postsSlice";

type Store = UsersSlice & PostsSlice;

export const useBlogStore = create<Store>()(
  devtools(
    persist(
      (...a) => ({
        ...createUsersSlice(...a),
        ...createPostsSlice(...a),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          userData: state.userData,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
