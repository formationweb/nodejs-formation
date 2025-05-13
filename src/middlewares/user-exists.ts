import usersData from "../data/users";
import { NotFoundError } from "../errors";

export function userExistsMiddleware(req, res, next) {
  const userId = +req.params.userId;
  const user = usersData.find((user) => user.id == userId);
  if (!user) {
    next(new NotFoundError("User not Found"));
    return;
  }
  req.user = user
  next()
}
