import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { login, recoverEmail, recoverPassword, register } from "../services/AuthService";
import { useBlogStore } from "../store/store";
import { isIntent } from "../helpers";
import { likePost, unlikePost } from "../services/PostServices";
import { createComment, deleteComment, editComment } from "../services/CommentsServices";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  const user = await login(data);
  useBlogStore.getState().setUserData(user);
  return redirect("/home");
};


export const registerAction = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  const response = await register(data);

  return response?.message
};


export const recoverEmailAction = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  const response = await recoverEmail(data);
  return response?.message 
};

export const recoverPasswordAction = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  const response = await recoverPassword(data);
  return response?.message;
};


export const homeAction = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  const intent = data.intent;

  if (!isIntent(intent)) {
    throw new Response("Invalid intent", { status: 400 });
  }

  let id_comment

  switch (intent) {
    case "like":
      await likePost(+data.id);
      break;

    case "unlike":
      await unlikePost(+data.id);
      break;

    case "comment-create":
      const id_post = parseInt(data.id_post as string);
      await createComment(id_post, data);
      break;

    case "comment-update":
       id_comment = parseInt(data.id_comment as string);
      await editComment(id_comment, data);
      break;

    case "comment-delete":
      id_comment = parseInt(data.id_comment as string);
      await deleteComment(id_comment, data);
  }

  return null;
};
