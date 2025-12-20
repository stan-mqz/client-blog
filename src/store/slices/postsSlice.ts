import { type StateCreator } from "zustand";
import type { Post } from "../../types/postsTypes";

export type PostsSlice = {
  posts: Post[];
  postError: string;
  setPostError: (message: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const createPostsSlice: StateCreator<PostsSlice> = (set) => ({
  posts: [],
  postError: "",
  setPostError: (message) => {
    set({ postError: message });
    setTimeout(() => set({ postError: "" }), 3000);
  },
  isModalOpen: false,
  openModal: () => {
    set(() => ({
      isModalOpen: true,
    }));
  },
  closeModal: () => {
    set(() => ({
      isModalOpen: false,
    }));
  },
});
