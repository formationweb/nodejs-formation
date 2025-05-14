import { Router } from "express";
import { createUser, deleteUser, followUser, getUserById, getUsers, getUsersPost, login, updateUser } from "./users.controller";
import { userExistsMiddleware } from "../../middlewares/user-exists";
import { validateBodyMiddleware } from "../../middlewares/validate-body";
import { followSchemaDto, loginDto, userSchemaDto, userUpdateSchemaDto } from "./users.schema";
import { isIdNumberMiddleware } from "../../middlewares/is-number";
import { hashPasswordMiddleware } from "../../middlewares/hash-password";
import { authMiddleware } from '../../middlewares/auth'

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
    validateBodyMiddleware(userUpdateSchemaDto), 
    hashPasswordMiddleware,
    updateUser
)
usersRouter.delete('/:userId',  isIdNumberMiddleware('userId'), deleteUser)
usersRouter.post('/follow', validateBodyMiddleware(followSchemaDto), authMiddleware, followUser)
usersRouter.post('/login', validateBodyMiddleware(loginDto), login)
