import { Router } from "express";
import { getMe, getPosts, updateMe } from "./me.controller";
import { validateBodyMiddleware } from "../../middlewares/validate-body";
import { userUpdateSchemaDto } from "../users/users.schema";
import { hashPasswordMiddleware } from "../../middlewares/hash-password";

export const meRouter = Router()

meRouter.get('/', getMe)
meRouter.get('/posts', getPosts)
meRouter.put('/', 
    validateBodyMiddleware(userUpdateSchemaDto), 
    hashPasswordMiddleware,
    updateMe
)