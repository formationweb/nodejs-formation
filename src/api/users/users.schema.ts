import { z } from "zod";

export const userSchemaDto = z.object({
    name: z.string().max(20).transform(username => username.trim().toLowerCase()),
    email: z.string().email()
})

export type UserDto = z.infer<typeof userSchemaDto>