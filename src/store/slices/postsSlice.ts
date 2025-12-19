import { type StateCreator } from "zustand";
import type { PostsData } from "../../types/postsTypes";

export type PostsSlice = {
    posts: PostsData[]
}


export const createPostsSlice : StateCreator<PostsSlice> = (set) => ({
    posts: []
})