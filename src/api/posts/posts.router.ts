import { Router } from "express";
import { getPostById, getPosts } from "./posts.controller";

export const postsRouter = Router()

postsRouter.get('/', getPosts)
postsRouter.get('/:postId', getPostById)