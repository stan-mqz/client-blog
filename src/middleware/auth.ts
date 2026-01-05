import { redirect, type MiddlewareFunction } from "react-router-dom";
import { useBlogStore } from "../store/store";

export const protectedMiddleware: MiddlewareFunction = async () => {

  const { isAuthenticated } = useBlogStore.getState();

  if (!isAuthenticated) {
    throw redirect("/auth/login");
  }

};
