import express from 'express'
import { usersRouter } from './api/users/users.router'
import { NotFoundError } from './errors'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRouter)

app.use((req, res, next) => {
    next(new NotFoundError('Url pas existant'))
})

app.use((err: Error & { status: number } , req, res, next) => {
    console.log(err.stack)
    res.status(err.status ?? 500).json({
        message: err.message
    })
})