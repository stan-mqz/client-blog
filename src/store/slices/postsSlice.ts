import { type StateCreator } from "zustand";
import type { Post } from "../../types/postsTypes";

export type PostsSlice = {
  posts: Post[];
  postError: string;
  setPostError: (message: string) => void;
  likedByUser: boolean
  setLikedByUser: (likeStatus: boolean) => void
};

export const createPostsSlice: StateCreator<PostsSlice> = (set) => ({
  posts: [],
  postError: "",
  setPostError: (message) => {
    set({ postError: message });
    setTimeout(() => set({ postError: "" }), 3000);
  },
  likedByUser: false,
  setLikedByUser: (likeStatus) => {
    set(() => ({
      likedByUser: likeStatus
    }))
  }
});
