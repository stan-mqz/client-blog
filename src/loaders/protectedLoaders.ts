import { redirect } from "react-router-dom";
import { useGlobalStore } from "../store/store";
import { me } from "../services/AuthService";

export const protectedLoader = async () => {
  const { isAuthenticated, setUserData } = useGlobalStore.getState();

  if (isAuthenticated) {
    return null;
  }

  const user = await me();

  if (!user) {
    return redirect("auth/login");
  }

  setUserData(user);
  return null;
};


export const protectedAuthLoader = async () => {
  const { isAuthenticated } = useGlobalStore.getState()

  
  if (isAuthenticated) {
    return redirect('/')
  }


}