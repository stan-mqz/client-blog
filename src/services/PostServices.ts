import { PostsArraySchema, type Post } from "../types/postsTypes";
import api from "./api";

export const getAllPosts = async () => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/posts/all`;
    const { data } = await api(URL);
    const result = PostsArraySchema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (id: Post["id_post"]) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/posts/${id}/like`;
    await api.post(URL);
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = async (id: Post["id_post"]) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/posts/${id}/like`;
    await api.delete(URL);
  } catch (error) {
    console.log(error);
  }
};
