import express from 'express'
import { usersRouter } from './api/users/users.router'
import { NotFoundError } from './errors'
import { postsRouter } from './api/posts/posts.router'
import { db } from './db'
import { meRouter } from './api/me/me.router'
import { authMiddleware } from './middlewares/auth'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'

await db.sync()

export const app = express()

const dirname = import.meta.dirname

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(helmet())

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)
app.use('/api/me', authMiddleware, meRouter)

app.use(express.static(path.join(dirname, 'public')))

app.use((req, res, next) => {
    next(new NotFoundError('Url pas existant'))
})

app.use((err: Error & { status: number } , req, res, next) => {
    console.log(err.stack)
    res.status(err.status ?? 500).json({
        message: err.message
    })
})