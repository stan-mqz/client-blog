import { userDataLogin } from "../types";
import api from "./api";

type userData = {
  [k: string]: FormDataEntryValue;
};

export const me = async () => {
  try {
    let response;
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/me`;

    response = await api.get(URL)

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
};

export const login = async (data: userData) => {
  try {
    let response;
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

    const result = userDataLogin.safeParse({
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      response = await api.post(URL, {
        email: data.email,
        password: data.password,
      });
    } else {
      throw new Error("Invalid Data");
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//Todo: This is just for testing protected route
export const getPosts = async () => {
  try {
    let response;
    const URL = `${import.meta.env.VITE_BACKEND_URL}/posts/all`;

    response = await api.get(URL)

    return response.data

  } catch (error) {
    
  }
}