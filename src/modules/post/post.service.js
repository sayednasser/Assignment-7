import { Sequelize } from "sequelize"; 
import { fn, col } from "sequelize";
import { commentModel, PostModel, UserModel } from "../../DB/model/index.js";
// 1
export const signup = async (inputs) => {
  const { title, content, userId } = inputs;
  const user = new PostModel({
    title,
    content,
    userId,
  });
  await user.save();
  return user;
};
//2
export const deleteUserByID = async (inputs) => {
  const { id, userid } = inputs;
  const post = await PostModel.findByPk(id);
  if (!post) {
    throw new Error("Post not found", { cause: { status: 404 } });
  }
  if (Number(post.userid) !== Number(userid)) {
    throw new Error("Not authorized to delete this post", {
      cause: { status: 403 },
    });
  }
  await PostModel.destroy({
    where: {
      id,
      userid,
    },
  });
  return post;
};
//3
export const getAllPost = async () => {
  const getPost = await PostModel.findAll({
    attributes: ["id", "title", "content"],
    include: [
      {
        model: UserModel,
        attributes: ["id", "name", "email"],
      }, 
      {
        model: commentModel,
        attributes: ["id", "content"],
      },
    ],
  });
  return getPost;
};
//4
export const getAllPostAndCountComment = async () => {
  const getPost = await PostModel.findAll({
    attributes: ["id", "title", [fn("COUNT", col("Comments.id")), "commentCount"]
], include: [
      {
        model: commentModel,
        attributes: []
      }
    ],
    group: ["Post.id"]
         
  });
  return {getPost };
};
