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

export type authUserData = {
  id: number;
  username: string;
  email: string;
  avatar: string;
};
