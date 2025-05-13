import usersData from "../../data/users";
import postsData from "../../data/posts";
import { NotFoundError } from "../../errors";

type Request = Express.Request
type RequestWithUser = Request & { user: any }

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

export function getUserById(req: RequestWithUser, res, next) {
  if (!req.user) {
    next(new Error('middleware manquant'))
    return
  }
  res.json(req.user);
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

export function getUsersPost(req, res, next) {
  const userId = req.params.userId;
  const posts = postsData.filter(post => post.userId == userId)
  res.json(posts)
}