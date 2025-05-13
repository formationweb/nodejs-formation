import usersData from "../../data/users";
import { NotFoundError } from "../../errors";

export function getUsers(req, res) {
  const search = req.query.search;
  if (search) {
    res.json(
      usersData.filter((users) => users.name.includes(search as string))
    );
    return;
  }
  res.json(usersData);
}

export function getUserById(req, res, next) {
  const userId = +req.params.userId;
  const user = usersData.find((user) => user.id == userId);
  if (!user) {
    next(new NotFoundError("User not Found"));
    return;
  }
  res.json(usersData);
}

export function createUser(req, res) {
  const body = req.body;
  console.log(body);
  res.json({
    id: 1,
    name: "asad",
  });
}

export function updateUser(req, res) {
  const userId = req.params.userId;
  const body = req.body;
  console.log(body);
  res.json({
    id: userId,
  });
}
