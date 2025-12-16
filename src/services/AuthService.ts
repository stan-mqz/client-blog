import { userDataLogin } from "../types";
import api from "./api";

type userData = {
  [k: string]: FormDataEntryValue;
};

export const login = async (data: userData) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

    const result = userDataLogin.safeParse({
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      await api.post(URL, {
        email: data.email,
        password: data.password,
      });

    } else {
      throw new Error("Invalid Data");
    }

    console.log("Te has logueado correctamente");
  } catch (error) {
    console.error(error);
  }
};
