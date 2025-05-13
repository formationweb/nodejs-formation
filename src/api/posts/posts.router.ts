import { Router } from "express";
import { createPost, getPostById, getPosts } from "./posts.controller";

export const postsRouter = Router()

postsRouter.get('/', getPosts)
postsRouter.get('/:postId', getPostById)
postsRouter.post('/', createPost)