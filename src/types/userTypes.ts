import { z } from "zod";
import { PostSchema } from "./postsTypes";

// Schema para usuario autenticado
export const AuthUserSchema = z.object({
  id_user: z.number(),
  username: z.string(),
  email: z.string(),
  avatar: z.string(),
});

// Schema para login
export const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

// Schema para registro
export const UserRegisterSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

// Schema para recuperar email
export const UserRecoverEmailSchema = z.object({
  email: z.string(),
  newEmail: z.string(),
});

// Schema para recuperar contraseña
export const UserRecoverPasswordSchema = z.object({
  email: z.string(),
  newPassword: z.string(),
});

// Schema básico de usuario
export const UserBasicSchema = z.object({
  id_user: z.number(),
  username: z.string(),
  avatar: z.string(),
});

export const UserProfileSchema = z.object({
  id_user: z.number(),
  username: z.string(),
  email: z.string(),
  avatar: z.string(),
  posts:  z.array(PostSchema)
});


export const UpdateUserNameSchema = z.object({
  username: z.string(),
  intent: z.string()
})


// Tipos TypeScript
export type AuthUser = z.infer<typeof AuthUserSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>
export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type UserRecoverEmail = z.infer<typeof UserRecoverEmailSchema>;
export type UserRecoverPassword = z.infer<typeof UserRecoverPasswordSchema>;
export type UserBasic = z.infer<typeof UserBasicSchema>;
export type formData = {
  [k: string]: FormDataEntryValue;
};
export type UpdateUserName = z.infer<typeof UpdateUserNameSchema>
export type UpdateUserEmail = Pick<AuthUser, 'email'>
export type UpdatePassword = {
  email : string,
  currentPassword: string,
  newPassword: string
}

export type UpdateAvatar = {
  image: FileList;
};
