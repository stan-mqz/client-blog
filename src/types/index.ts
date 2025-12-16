import z from 'zod'

export const userDataLogin = z.object({
    email: z.string(),
    password: z.string()
}) 

export type userData = {
    id: number,
    username: string,
    email: string,
    avatar: string
}