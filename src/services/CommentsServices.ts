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
    const result = CreateCommentSchema.safeParse({
      intent: data.intent,
      content_comment: data.content_comment,
    });

    if (!result.success) {
      return console.log(result.error);
    }

    await api.post(`/comments/create-comment/${id_post}`, {
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
    const result = UpdateCommentSchema.safeParse({
      id_comment,
      update_comment: data.update_comment,
      intent: data.intent,
    });

    if (!result.success) {
      console.log(result.error);
    }

    await api.patch(`/comments/edit-comment/${id_comment}`, {
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
    const result = DeleteCommentSchema.safeParse({
      id_comment,
      intent: data.intent
    })

    if (!result.success) {
      console.log(result.error)
    }

    await api.delete(`/comments/delete-comment/${id_comment}`)


  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    if (err.response && err.response.data) {
      setCommentError(err.response.data.message || "Something went wrong");
    } else {
      setCommentError(err.message || "Something went wrong");
    }
  }
};
