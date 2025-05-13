import usersData from "../../data/users";
import postsData from "../../data/posts";
import { Follow } from "./users.schema";
import { BadRequestError, NotFoundError } from "../../errors";
import { User } from "./users.model";

type Follows = Follow[];

const follows: Follows = [];

type Request = Express.Request;
type RequestWithUser = Request & { user: any };

export async function getUsers(req, res, next) {
  try {
    //const search = req.query.search;
    // if (search) {
    //   res.json(
    //     usersData.filter((users) => users.name.includes(search as string))
    //   );
    //   return;
    // }
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export function getUserById(req: RequestWithUser, res, next) {
  try {
    if (!req.user) {
      throw new Error("middleware manquant")
    }
    res.json(req.user);
  }
  catch (err) {
    next(err)
  }
}

export async function createUser(req, res, next) {
  try {
    const body = req.body;
    const userCreated = await User.create(body);
    res.json(userCreated);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const body = req.body;
    const [userIdModified] = await User.update(body, {
      where: {
        id: userId
      }
    })
    if (!userIdModified) {
      throw new NotFoundError('Not Found User')
    }
    res.json(
      await User.findByPk(userIdModified)
    );
  }
  catch (err) {
    next(err)
  }
}

export function getUsersPost(req, res, next) {
  const userId = req.params.userId;
  const posts = postsData.filter((post) => post.userId == userId);
  res.json(posts);
}

export function followUser(req, res, next) {
  try {
    const body = req.body;
    const { followerId, followeeId } = body;

    if (!usersData.find((user) => user.id == followerId)) {
      throw new NotFoundError("followerId not exists");
    }

    if (!usersData.find((user) => user.id == followeeId)) {
      throw new NotFoundError("followeeId not exists");
    }

    const pairFound = follows.find(
      (follow) =>
        follow.followerId == followerId && follow.followeeId == followeeId
    );

    if (pairFound) {
      throw new BadRequestError("déjà entrée");
    }

    follows.push(body);

    res.status(201).json(body);
  } catch (err) {
    next(err);
  }
}
