import { Sequelize } from "sequelize";
import { fn, col } from "sequelize";
import { comment, Post, UserModel } from "../../DB/model/index.js";
export const signup = async (inputs) => {
  const { title, content, userid } = inputs;
  const user = new Post({
    title,
    content,
    userid,
  });
  await user.save();
  return user;
};

export const deleteUserByID = async (inputs) => {
  const { id, userid } = inputs;
  const post = await Post.findByPk(id);
  if (!post) {
    throw new Error("Post not found", { cause: { status: 404 } });
  }
  if (Number(post.userid) !== Number(userid)) {
    throw new Error("Not authorized to delete this post", {
      cause: { status: 403 },
    });
  }
  await Post.destroy({
    where: {
      id,
      userid,
    },
  });
  return post;
};

export const getAllPost = async () => {
  const getPost = await Post.findAll({
    attributes: ["id", "title", "content"],
    include: [
      {
        model: UserModel,
        attributes: ["id", "name", "email"],
      }, 
      {
        model: comment,
        attributes: ["id", "content"],
      },
    ],
  });
  return getPost;
};
export const getAllPostAndCountComment = async () => {
  const getPost = await Post.findAll({
    attributes: ["id", "title", [fn("COUNT", col("Comments.id")), "commentCount"]
], include: [
      {
        model: comment,
        attributes: []
      }
    ],
    group: ["Post.id"]
         
  });
  return {getPost };
};
