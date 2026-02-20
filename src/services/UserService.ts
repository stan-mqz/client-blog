import type { AxiosError } from "axios";
import {
  AuthUserSchema,
  UpdateAvatarSchema,
  UpdatePasswordSchema,
  UpdateUserEmailSchema,
  UpdateUserNameSchema,
  type AuthUser,
  type formData,
} from "../types/userTypes";
import api from "./api";
import { useBlogStore } from "../store/store";

const { setSettingsError, setSettingsSuccess, setUserData } =
  useBlogStore.getState();

export const getUserProfile = async (id: AuthUser["id_user"]) => {
  try {
    if (!id) {
      throw new Error("Id cannot be empty");
    }

    const result = AuthUserSchema.shape.id_user.safeParse(id);

    if (!result.success) {
      console.log(result.error);
    }

    const { data } = await api.get(`/user/profile/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateUserName = async (data: formData) => {
  try {
    const result = UpdateUserNameSchema.safeParse({
      username: data.username,
      intent: data.intent,
    });

    if (!result.success) {
      console.log(result.error);
    }

    const response = await api.patch(`/user/update-username`, {
      username: data.username,
    });

    setUserData({ username: response.data.username });

    setSettingsSuccess("Username updated correctly ^^", "username");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setSettingsError(
        err.response.data.message || "Something went wrong",
        "error-username",
      );
    } else {
      setSettingsError(err.message || "Something went wrong", "error-username");
    }
  }
};

export const UpdateUserEmail = async (data: formData) => {
  try {
    const result = UpdateUserEmailSchema.safeParse({
      email: data.email,
      intent: data.intent,
    });

    if (!result.success) {
      console.log(result.error);
    }

    const response = await api.patch(`/user/update-email`, {
      email: data.email,
    });

    setUserData({ email: response.data.email });

    setSettingsSuccess("E-mail updated correctly ^^", "email");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setSettingsError(
        err.response.data.message || "Something went wrong",
        "error-email",
      );
    } else {
      setSettingsError(err.message || "Something went wrong", "error-email");
    }
  }
};

export const UpdateAvatar = async (data: formData) => {
  try {
    const result = UpdateAvatarSchema.safeParse({
      avatar: data.avatar,
      intent: data.intent,
    });

    if (!result.success) {
      console.log(result.error);
    }

    const response = await api.patch(
      `/user/update-avatar`,
      {
        avatar: data.avatar,
      },
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    setUserData({ avatar: response.data.avatar });

    setSettingsSuccess("Avatar updated correctly ^^", "avatar");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setSettingsError(
        err.response.data.message || "Something went wrong",
        "error-avatar",
      );
    } else {
      setSettingsError(err.message || "Something went wrong", "error-avatar");
    }
  }
};

export const UpdatePassword = async (data: formData) => {
  try {
    const result = UpdatePasswordSchema.safeParse({
      email: data.email,
      currentPassword: data.password,
      newPassword: data.newPassword,
      intent: data.intent,
    });

    if (!result.success) {
      console.log(result);
    }

    await api.patch(`/user/update-password`, {
      email: data.email,
      password: data.password,
      newPassword: data.newPassword,
    });

    setSettingsSuccess("Password updated correctly ^^", "password");

  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    if (err.response && err.response.data) {
      setSettingsError(
        err.response.data.message || "Something went wrong",
        "error-password",
      );
    } else {
      setSettingsError(err.message || "Something went wrong", "error-password");
    }
  }
};
