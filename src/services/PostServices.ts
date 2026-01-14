import type { AxiosError } from "axios";
import { useBlogStore } from "../store/store";
import {
  CreatePostSchema,
  PostsArraySchema,
  PostSchema,
  type Post,
} from "../types/postsTypes";
import type { formData } from "../types/userTypes";
import api from "./api";

const { setPostError } = useBlogStore.getState();

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

export const getPostById = async (id: Post["id_post"]) => {
  try {
    const { data } = await api(`posts/${id}`);

    const result = PostSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
    }

    return data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setPostError(err.response.data.message || "Something went wrong");
    } else {
      setPostError(err.message || "Something went wrong");
    }
  }
};

export const createPost = async (data: formData) => {
  try {
    const result = CreatePostSchema.safeParse({
      title: data.title,
      content: data.content,
    });

    if (!result.success) {
      console.log(result.error);
    }

    await api.post(
      "/posts/create-post",
      {
        title: data.title,
        content: data.content,
        image: data.image,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setPostError(err.response.data.message || "Something went wrong");
    } else {
      setPostError(err.message || "Something went wrong");
    }
  }
};

export const editPost = async (id: Post["id_post"], data: formData) => {
  try {
    const result = CreatePostSchema.safeParse({
      id_post: id,
      title: data.title,
      content: data.content,
    });

    if (!result.success) {
      console.log(result.error);
    }

    await api.patch(
      `/posts/edit-post/${id}`,
      {
        title: data.title,
        content: data.content,
        image: data.image,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  } catch (error) {
    console.log(error);
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setPostError(err.response.data.message || "Something went wrong");
    } else {
      setPostError(err.message || "Something went wrong");
    }
  }
};

export const deletePost = async (id: Post["id_post"]) => {
  try {
    await api.delete(`/posts/delete/${id}`);
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
