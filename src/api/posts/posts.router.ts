import { Router } from "express";
import { createPost, getPostById, getPosts } from "./posts.controller";
import { authMiddleware } from "../../middlewares/auth";

export const postsRouter = Router()

postsRouter.get('/', getPosts)
postsRouter.get('/:postId', getPostById)
postsRouter.post('/', authMiddleware, createPost)