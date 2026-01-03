import { redirect } from "react-router-dom";
import { useBlogStore } from "../store/store";



export const protectedAuthLoader = async () => {
  const { isAuthenticated } = useBlogStore.getState();

  if (isAuthenticated) {
    return redirect("/");
  }

  return null;
};
