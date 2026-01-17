import { AuthUserSchema, type AuthUser } from "../types/userTypes";
import api from "./api";

export const getUserProfile = async (id: AuthUser["id_user"]) => {
  try {
    if (!id) {
      throw new Error("Id cannot be empty");
    }

    const result = AuthUserSchema.shape.id_user.safeParse(id);

    if (!result.success) {
        console.log(result.error)
    }

    const {data} = await api.get(`/user/profile/${id}`)


    return data


  } catch (error) {
    console.log(error);
  }
};
