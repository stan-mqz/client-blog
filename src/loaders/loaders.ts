import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { verifyEmail } from "../services/AuthService";
import { getAllPosts, getPostById } from "../services/PostServices";
import { useBlogStore } from "../store/store";
import { getUserProfile } from "../services/UserService";

export const authLoader = async () => {
  const { isAuthenticated } = useBlogStore.getState();

  if (isAuthenticated) {
    return redirect("/home");
  }

  return null;
};

export const verifyEmailLoader = async ({ request }: LoaderFunctionArgs) => {
  let result;
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (token) {
    result = await verifyEmail(token);
  }

  return result;
};

export const homeLoader = async () => {
  const response = await getAllPosts();
  return response;
};

export const getSinglePostLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  const post = await getPostById(+id!);

  if (post) return post;
  return redirect("/home");
};

export const profileLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  const data = await getUserProfile(+id!);
  return data;

};
