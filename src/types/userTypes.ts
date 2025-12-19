import z from "zod";

export type authUserData = {
  id: number;
  username: string;
  email: string;
  avatar: string;
};


export const userDataLogin = z.object({
  email: z.string(),
  password: z.string(),
});

export const userDataRegister = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const userDataRecoverEmail = z.object({
  email: z.string(),
  newEmail: z.string()
})


export const userDataRecoverPassword = z.object({
  email: z.string(),
  newPassword: z.string()
})

export type loginData = z.infer<typeof userDataLogin>

export type registerData = z.infer<typeof userDataRegister>

export type recoverEmailData = z.infer<typeof userDataRecoverEmail>

export type recoverPasswordData = z.infer<typeof userDataRecoverPassword>

 