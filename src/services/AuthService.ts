import type { AxiosError } from "axios";
import { useGlobalStore } from "../store/store";
import { userDataLogin, userDataRegister } from "../types";
import api from "./api";

type userData = {
  [k: string]: FormDataEntryValue;
};

const { setError } = useGlobalStore.getState();

export const me = async () => {
  try {
    let response;

    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/me`;

    response = await api.get(URL);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
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
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setError(err.response.data.message || "Something went wrong");
    } else {
      setError(err.message || "Something went wrong");
    }
    return null;
  }
};

export const register = async (data: userData) => {
  try {
    let response;
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/register`;

    const result = userDataRegister.safeParse({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      response = await api.post(URL, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } else {
      throw new Error("Invalid Data");
    }

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setError(err.response.data.message || "Something went wrong");
    } else {
      setError(err.message || "Something went wrong");
    }
  }
};

export const verifyEmail = async (token: string) => {
  let success;

  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/verify-email`;

    await api.post(URL, {
      verficationToken: token,
    });

    success = true;

    return success;
  } catch (error) {
    success = false;
    return success;
  }
};

export const logout = async () => {
  try {
    useGlobalStore.setState({
      isLoading: true,
    });
    const store = useGlobalStore.getState();
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/logout`;

    await api.post(URL);

    store.setUserData(null);
  } catch (error) {
    console.error("Error logging out:", error);
    return null;
  } finally {
    useGlobalStore.setState({
      isLoading: false,
    });
  }
};
