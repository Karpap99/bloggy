import { z } from "zod";


const baseAuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const UserLoginSchema = baseAuthSchema

export type UserLogin = z.infer<typeof UserLoginSchema>


export const UserRegisterSchema = baseAuthSchema.extend({
    repeatPassword: z.string().min(6),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
