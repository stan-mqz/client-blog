import { redirect, type MiddlewareFunction } from "react-router-dom";
import { me } from "../services/AuthService";

export const protectedMiddleware: MiddlewareFunction = async () => {
  const user = await me();

  if (!user) {
    throw redirect("/auth/login");
  }

  // context.set(UserContext, user)
};

