import z from "zod";

export const userDataLogin = z.object({
  email: z.string(),
  password: z.string(),
});

export const userDataRegister = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});


export type loginData = z.infer<typeof userDataLogin>

export type registerData = z.infer<typeof userDataRegister>

export type authUserData = {
  id: number;
  username: string;
  email: string;
  avatar: string;
};


 