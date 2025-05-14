import { User } from "../api/users/users.model"
import { NotAuthorizedError } from "../errors"
import jwt from 'jsonwebtoken'

type JwtPayload = {
    userId: string
}

export async function authMiddleware(req, res, next) {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            throw 'Token not found'
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string) as JwtPayload
        req.user = await User.findByPk(decoded.userId, {
            attributes: {
                exclude: ['password']
            }
        })
        next()
    }
    catch (message) {
        next(new NotAuthorizedError(message))
    }
}