import { Router } from "express";
import { createUser, deleteUser, followUser, getUserById, getUsers, getUsersPost, login, updateUser } from "./users.controller";
import { userExistsMiddleware } from "../../middlewares/user-exists";
import { validateBodyMiddleware } from "../../middlewares/validate-body";
import { followSchemaDto, loginDto, userSchemaDto } from "./users.schema";
import { isIdNumberMiddleware } from "../../middlewares/is-number";
import { hashPasswordMiddleware } from "../../middlewares/hash-password";

export const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:userId', 
    isIdNumberMiddleware('userId'), 
    userExistsMiddleware, 
    getUserById
)
usersRouter.get('/:userId/posts', 
    isIdNumberMiddleware('userId'), 
    userExistsMiddleware, getUsersPost
)
usersRouter.post('/', 
    validateBodyMiddleware(userSchemaDto), 
    hashPasswordMiddleware,
    createUser
)
usersRouter.put('/:userId', 
    isIdNumberMiddleware('userId'), 
    validateBodyMiddleware(userSchemaDto), 
    hashPasswordMiddleware,
    updateUser
)
usersRouter.delete('/:userId',  isIdNumberMiddleware('userId'), deleteUser)
usersRouter.post('/follow', validateBodyMiddleware(followSchemaDto), followUser)
usersRouter.post('/login', validateBodyMiddleware(loginDto), login)
