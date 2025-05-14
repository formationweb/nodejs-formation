import { Router } from "express";
import { createPost, getPostById, getPosts } from "./posts.controller";
import { authMiddleware } from "../../middlewares/auth";
import { roleMiddleware } from "../../middlewares/role";
import { Role } from "../users/users.model";

export const postsRouter = Router()

postsRouter.get('/', getPosts)
postsRouter.get('/:postId', getPostById)
postsRouter.post('/', authMiddleware, roleMiddleware([Role.Author]), createPost)