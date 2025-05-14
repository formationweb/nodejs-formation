import { z } from "zod";

export const userSchemaDto = z.object({
    name: z.string().max(20).transform(username => username.trim().toLowerCase()),
    email: z.string().email(),
    password: z.string()
})

export const userUpdateSchemaDto = userSchemaDto.strict().partial()

export const followSchemaDto = z.object({
    followeeId: z.number().int().positive()
}).strict()

export const loginDto = z.object({
    email: z.string(),
    password: z.string()
}).strict()

export type UserDto = z.infer<typeof userSchemaDto>
export type Follow = z.infer<typeof followSchemaDto>