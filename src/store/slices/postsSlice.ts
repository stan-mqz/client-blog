import { type StateCreator } from "zustand";

export type PostsSlice = {
  postError: string;
  setPostError: (message: string) => void;
  commentError: string;
  setCommentError: (message: string) => void;
};

export const createPostsSlice: StateCreator<PostsSlice> = (set) => ({
  postError: "",
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
