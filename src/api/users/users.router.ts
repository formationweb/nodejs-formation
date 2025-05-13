import { Router } from "express";
import { createUser, getUserById, getUsers, getUsersPost, updateUser } from "./users.controller";
import { userExistsMiddleware } from "../../middlewares/user-exists";

export const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:userId', userExistsMiddleware, getUserById)
usersRouter.get('/:userId/posts', userExistsMiddleware, getUsersPost)
usersRouter.post('/', createUser)
usersRouter.put('/:userId', updateUser)

