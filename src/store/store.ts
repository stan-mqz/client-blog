import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { createUsersSlice, type UsersSlice } from "./slices/usersSlice";
import { createPostsSlice, type PostsSlice } from "./slices/postsSlice";

export const useBlogStore = create<UsersSlice & PostsSlice>()(devtools((...a) => ({
  ...createUsersSlice(...a),
  ...createPostsSlice(...a),
}))) 