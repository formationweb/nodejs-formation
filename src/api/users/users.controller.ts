import { BadRequestError, NotAuthorizedError, NotFoundError } from "../../errors";
import { User } from "./users.model";
import { Post } from "../posts/posts.model";
import { db } from "../../db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Follow } from "./follow.model";

type Request = Express.Request;
type RequestWithUser = Request & { user: any };

const commonAttrs = {
  attributes: {
    exclude: ['password']
  }
}

if (!process.env.JWT_SECRET_TOKEN) {
  console.error('JWT_SECRET_TOKEN env missing')
  process.exit(1)
}

export async function getUsers(req, res, next) {
  try {
    //const search = req.query.search;
    // if (search) {
    //   res.json(
    //     usersData.filter((users) => users.name.includes(search as string))
    //   );
    //   return;
    // }
    const users = await User.findAll(commonAttrs);
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
      await User.findByPk(userIdModified, commonAttrs)
    );
  }
  catch (err) {
    next(err)
  }
}

export async function getUsersPost(req, res, next) {
  try {
    const userId = req.params.userId;
    const posts = await Post.findAll({
      where: {
        userId
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password']
          }
        }
      ]
    })
    res.json(posts);
  }
  catch (err) {
    next(err)
  }
}

export async function followUser(req, res, next) {
  try {
    const body = req.body;
    const follower = req.user
    const { followeeId } = body;

    const followee = await User.findByPk(followeeId)

    if (!followee) {
      throw new NotFoundError('Followee not exists')
    }

    const data = {
      followeeId,
      followerId: follower.id
    }

    const existingFollow = await Follow.findOne({
      where: data
    })

    if (existingFollow) {
      throw new BadRequestError()
    }

    await Follow.create(data)

    res.status(204).send()
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  const transaction = await db.transaction()
  try {
    const userId = req.params.userId
    await Post.destroy({
      where: {
        userId
      },
      transaction
    })
    const rowsDeleted = await User.destroy({
      where: {
        id: userId
      },
      transaction
    })

    if (!rowsDeleted) {
      throw new NotFoundError('Not User Found')
    }

    await transaction.commit()

    res.status(204).send()
  }
  catch (err) {
    await transaction.rollback()
    next(err)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ 
        where: {
          email
        }
    })
    if (!user) {
      throw new NotAuthorizedError()
    }
    const isRightPassword = await bcrypt.compare(password, user.password)
    if (!isRightPassword) {
      throw new NotAuthorizedError()
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_TOKEN as string, {
      expiresIn: '15m'
    })
    res.cookie('token', token, {
      httpOnly: true
    })
    res.json({
      token,
      userId: user.id
    })
  }
  catch (err) {
    next(err)
  }
}