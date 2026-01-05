import type { AxiosError } from "axios";
import { useBlogStore } from "../store/store";
import {
  UserLoginSchema,
  UserRecoverEmailSchema,
  UserRecoverPasswordSchema,
  UserRegisterSchema,
} from "../types/userTypes";
import api from "./api";

type userData = {
  [k: string]: FormDataEntryValue;
};

const { setAuthError } = useBlogStore.getState();

export const me = async () => {
  try {
    let response;

    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/me`;

    response = await api.get(URL);

    return response.data;
  } catch (error) {
    return null;
  }
};

export const login = async (data: userData) => {
  try {
    let response;
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;

    const result = UserLoginSchema.safeParse({
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      return result.error;
    }

    response = await api.post(URL, {
      email: data.email,
      password: data.password,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setAuthError(err.response.data.message || "Something went wrong");
    } else {
      setAuthError(err.message || "Something went wrong");
    }
  }
};

export const register = async (data: userData) => {
  try {
    let response;
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/register`;

    const result = UserRegisterSchema.safeParse({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      return result.error;
    }

    response = await api.post(URL, {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setAuthError(err.response.data.message || "Something went wrong");
    } else {
      setAuthError(err.message || "Something went wrong");
    }

    return null;
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

export const recoverEmail = async (data: userData) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/recover-email`;

    const result = UserRecoverEmailSchema.safeParse({
      email: data.email,
      newEmail: data.newEmail,
    });

    if (!result.success) {
      return result.error;
    }

    const response = await api.post(URL, {
      email: data.email,
      newEmail: data.newEmail,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setAuthError(err.response.data.message || "Something went wrong");
    } else {
      setAuthError(err.message || "Something went wrong");
    }
  }

  return null;
};

export const recoverPassword = async (data: userData) => {
  try {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/recover-password`;

    const result = UserRecoverPasswordSchema.safeParse({
      email: data.email,
      newPassword: data.newPassword,
    });

    if (!result.success) {
      return result.error;
    }

    const response = await api.post(URL, {
      email: data.email,
      newPassword: data.newPassword,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setAuthError(err.response.data.message || "Something went wrong");
    } else {
      setAuthError(err.message || "Something went wrong");
    }
  }
};

export const logout = async () => {
  try {
    useBlogStore.setState({
      isLoading: true,
    });
    const store = useBlogStore.getState();
    const URL = `${import.meta.env.VITE_BACKEND_URL}/auth/logout`;

    await api.post(URL);

    store.setUserData(null);
  } catch (error) {
    console.error("Error logging out:", error);
    return null;
  } finally {
    useBlogStore.setState({
      isLoading: false,
    });
  }
};
