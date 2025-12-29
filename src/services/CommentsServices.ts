import { useBlogStore } from "../store/store";
import {
  CreateCommentSchema,
  DeleteCommentSchema,
  UpdateCommentSchema,
  type Comment,
} from "../types/commentsTypes";
import type { Post } from "../types/postsTypes";
import { AxiosError } from "axios";
import api from "./api";

const { setCommentError } = useBlogStore.getState();

type CommentData = {
  [k: string]: FormDataEntryValue;
};

export const createComment = async (
  id_post: Post["id_post"],
  data: CommentData
) => {
  try {
    const URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/comments/create-comment/${id_post}`;

    const result = CreateCommentSchema.safeParse({
      intent: data.intent,
      content_comment: data.content_comment,
    });

    if (!result.success) {
      return console.log(result.error);
    }

    await api.post(URL, {
      content_comment: data.content_comment,
    });
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    if (err.response && err.response.data) {
      setCommentError(err.response.data.message || "Something went wrong");
    } else {
      setCommentError(err.message || "Something went wrong");
    }
  }
};

export const editComment = async (
  id_comment: Comment["id_comment"],
  data: CommentData
) => {
  try {
    const URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/comments/edit-comment/${id_comment}`;

    const result = UpdateCommentSchema.safeParse({
      id_comment,
      update_comment: data.update_comment,
      intent: data.intent,
    });

    if (!result.success) {
      console.log(result.error);
    }

    await api.patch(URL, {
      content_comment: data.update_comment,
    });
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    if (err.response && err.response.data) {
      setCommentError(err.response.data.message || "Something went wrong");
    } else {
      setCommentError(err.message || "Something went wrong");
    }
  }
};

export const deleteComment = async (id_comment: Comment["id_comment"], data: CommentData) => {
  try {
    const URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/comments/delete-comment/${id_comment}`;

    const result = DeleteCommentSchema.safeParse({
      id_comment,
      intent: data.intent
    })

    if (!result.success) {
      console.log(result.error)
    }

    await api.delete(URL)


  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    if (err.response && err.response.data) {
      setCommentError(err.response.data.message || "Something went wrong");
    } else {
      setCommentError(err.message || "Something went wrong");
    }
  }
};
