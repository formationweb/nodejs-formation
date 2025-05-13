import postsData from "../../data/posts";
import { NotFoundError } from "../../errors";

export function getPosts(req, res) {
  const search = req.params.search;
  if (search) {
    res.json(
      postsData.filter((post) => post.title.includes(search as string))
    );
    return;
  }
  res.json(postsData);
}

export function getPostById(req, res, next) {
  const postId = +req.params.postId;
  const post = postsData.find((post) => post.id == postId);
  if (!post) {
    next(new NotFoundError("Post not Found"));
    return;
  }
  res.json(post);
}
