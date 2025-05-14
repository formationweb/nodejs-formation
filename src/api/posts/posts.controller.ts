import { Op } from "sequelize";
import { NotFoundError } from "../../errors";
import { Post } from "./posts.model";
import { User } from "../users/users.model";

export async function getPosts(req, res, next) {
 try {
  const search = req.query.search;
  let filter = {}
  if (search) {
    filter = {
      where: {
        title: {
          [Op.like]: `%${search}%`
        }
      }
    }
  }
  const posts = await Post.findAll(filter)
  res.json(posts);
 }
 catch (err) {
  next(err)
 }
}

export async function getPostById(req, res, next) {
  try {
    const postId = +req.params.postId;
    const post = await Post.findByPk(postId, {
      attributes: {
        exclude: ['createdAt', 'userId']
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['email']
          }
        }
      ]
    })
    if (!post) {
      throw new NotFoundError('Post Not Found')
    }
    res.json(post);
  }
  catch (err) {
    next(err)
  }
}

export async function createPost(req, res, next) {
  try {
    const body = req.body;
    const postCreated = await Post.create({
      ...body,
      userId: req.user.id
    });
    res.json(postCreated);
  } catch (err) {
    next(err);
  }
}
