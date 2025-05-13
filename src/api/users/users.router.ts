import { Router } from "express";
import { createUser, getUserById, getUsers, updateUser } from "./users.controller";

export const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:userId', getUserById)
usersRouter.post('/', createUser)
usersRouter.put('/:userId', updateUser)

