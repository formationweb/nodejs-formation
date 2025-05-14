import { NotFoundError } from "../../errors"
import { User } from "../users/users.model"

export function getMe(req, res, next) {
    res.json(req.user)
}

export async function updateMe(req, res, next) {
   try {
    const body = req.body
    const userId = req.user.id
    const [userIdModified] = await User.update(body, {
        where: {
            id: userId
        }
    })
    if (!userIdModified) {
        throw new NotFoundError('Not Found User')
    }
    res.json(
        await User.findByPk(userIdModified, {
            attributes: {
                exclude: ['password']
            }
        })
    );
   }
   catch (err) {
    next(err)
   }
}