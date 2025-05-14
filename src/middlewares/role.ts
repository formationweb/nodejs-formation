import { Role } from "../api/users/users.model"
import { ForbiddenError } from "../errors"

export function roleMiddleware(roles) {
    return (req, res, next) => {
        try {
            const userRole = req.user.role
            if (!roles.includes(userRole) && userRole != Role.Admin) {
                throw 'role not permitted'
            }
            next()
        }
        catch (message) {
            next(new ForbiddenError(message))
        }
    }
}