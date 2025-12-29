import { type StateCreator } from "zustand";
import type { Post } from "../../types/postsTypes";

export type PostsSlice = {
  posts: Post[];
  postError: string;
  modalPost: boolean;
  setModalPost: (isOpen : boolean) => void
  setPostError: (message: string) => void;
  commentError: string;
  setCommentError: (message: string) => void;
};

export const createPostsSlice: StateCreator<PostsSlice> = (set) => ({
  posts: [],
  postError: "",
  modalPost: false,
  setModalPost: (isOpen) => {
    set({modalPost: isOpen})
  },
  setPostError: (message) => {
    set({ postError: message });
    setTimeout(() => set({ postError: "" }), 3000);
  },

  commentError: "",
  setCommentError: (message) => {
    set(() => ({
      commentError: message,
    }));

    setTimeout(() => {
      set(() => ({
        commentError: "",
      }));
    }, 3000);
  },
});
