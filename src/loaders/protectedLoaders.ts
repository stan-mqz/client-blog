import { redirect } from "react-router-dom";
import { useBlogStore } from "../store/store";
import { me } from "../services/AuthService";

export const protectedLoader = async () => {
  const user = await me();

  if (!user) {
    return redirect("auth/login");
  }

  useBlogStore.getState().setUserData(user);
  return null;
};

export const protectedAuthLoader = async () => {
  const { isAuthenticated } = useBlogStore.getState();

  if (isAuthenticated) {
    return redirect("/");
  }

  return null;
};
