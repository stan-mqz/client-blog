import type { AxiosError } from "axios";
import {
  AuthUserSchema,
  UpdateUserNameSchema,
  type AuthUser,
  type formData,
} from "../types/userTypes";
import api from "./api";
import { useBlogStore } from "../store/store";

const { setSettingsError, setSettingsSuccess, setUserData } = useBlogStore.getState();

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

    setUserData({username: response.data.username})

    setSettingsSuccess('Username updated correctly ^^')
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response && err.response.data) {
      setSettingsError(err.response.data.message || "Something went wrong");
    } else {
      setSettingsError(err.message || "Something went wrong");
    }
  }
};
