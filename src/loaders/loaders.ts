import { redirect } from "react-router-dom";
import { me } from "../services/AuthService";

export const authLoader = async () => {
  const user = await me();

  if (user) {
    return redirect("/home");
  }

  return null;
};
