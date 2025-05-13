import { Router } from "express";
import { createUser, followUser, getUserById, getUsers, getUsersPost, updateUser } from "./users.controller";
import { userExistsMiddleware } from "../../middlewares/user-exists";
import { validateBodyMiddleware } from "../../middlewares/validate-body";
import { followSchemaDto, userSchemaDto } from "./users.schema";
import { isIdNumberMiddleware } from "../../middlewares/is-number";

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
    createUser
)
usersRouter.put('/:userId', 
    isIdNumberMiddleware('userId'), 
    validateBodyMiddleware(userSchemaDto), 
    updateUser
)

usersRouter.post('/follow', validateBodyMiddleware(followSchemaDto), followUser)
