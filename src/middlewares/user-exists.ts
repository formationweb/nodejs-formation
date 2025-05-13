import { User } from "../api/users/users.model";
import usersData from "../data/users";
import { NotFoundError } from "../errors";

export async function userExistsMiddleware(req, res, next) {
  try {
    const userId = +req.params.userId;
    const user = await User.findByPk(userId)
    if (!user) {
      throw new NotFoundError("User not Found")
    }
    req.user = user
    next()
  }
  catch (err) {
    next(err)
  }
}
