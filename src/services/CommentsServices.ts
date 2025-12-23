import { useBlogStore } from "../store/store";
import { CreateCommentSchema } from "../types/commentsTypes";
import type { Post } from "../types/postsTypes";
import { AxiosError } from "axios";
import api from "./api";

const { setCommentError } = useBlogStore.getState();

type CommentData = {
    [k: string]: FormDataEntryValue;
}

export const createComment = async (
  id_post: Post["id_post"],
  data: CommentData
) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/comments/create-comment/${id_post}`;

    const result = CreateCommentSchema.safeParse({
        content_comment: data.content_comment   
    })

    if (!result.success) {
        return result.error
    }

     await api.post(URL, {
        content_comment : data.content_comment
    })

    console.log('Creado')
    
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    if (err.response && err.response.data) {
      setCommentError(err.response.data.message || "Something went wrong");
    } else {
      setCommentError(err.message || "Something went wrong");
    }
  }
};
