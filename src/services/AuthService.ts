import type { AxiosError } from "axios";
import { useBlogStore } from "../store/store";
import {
  UserLoginSchema,
  UserRecoverEmailSchema,
  UserRecoverPasswordSchema,
  UserRegisterSchema,
  type formData,
} from "../types/userTypes";
import api from "./api";



const { setAuthError } = useBlogStore.getState();

export const me = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const login = async (data: formData) => {
  try {
    const result = UserLoginSchema.safeParse({
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      return result.error;
    }

    const response = await api.post("/auth/login", {
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

export const register = async (data: formData) => {
  try {
    const result = UserRegisterSchema.safeParse({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      return result.error;
    }

    const response = await api.post("/auth/register", {
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
    await api.post("/auth/verify-email", {
      verficationToken: token,
    });

    success = true;

    return success;
  } catch (error) {
    success = false;
    return success;
  }
};

export const recoverEmail = async (data: formData) => {
  try {
    const result = UserRecoverEmailSchema.safeParse({
      email: data.email,
      newEmail: data.newEmail,
    });

    if (!result.success) {
      return result.error;
    }

    const response = await api.post("/auth/recover-email", {
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

export const recoverPassword = async (data: formData) => {
  try {
    const result = UserRecoverPasswordSchema.safeParse({
      email: data.email,
      newPassword: data.newPassword,
    });

    if (!result.success) {
      return result.error;
    }

    const response = await api.post("/auth/recover-password", {
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

    await api.post("/auth/logout");

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
