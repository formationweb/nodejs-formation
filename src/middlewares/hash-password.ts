import bcrypt from 'bcrypt'

export async function hashPasswordMiddleware(req, res, next) {
    const password = req.body.password
    if (!password) {
        next()
        return
    }
    req.body.password = await bcrypt.hash(password, 10)
    next()
}