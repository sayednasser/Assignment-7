import { Op } from"sequelize";
import { comment, Post, UserModel } from "../../DB/model/index.js";
//1
export const signup = async (inputs) => {
  const added = await comment.bulkCreate(inputs, { validate: true });
  return added;
};
//2
export const updatedCommentByID = async (inputs) => {
  const { Id, userId, content } = inputs;
  const comments = await comment.findByPk(Id);
  if (!comments) {
    throw new Error("comment not found", { cause: { status: 404 } });
  }


  if (Number(comments.userId) !== Number(userId)) {
    throw new Error("Not authorized to update this comment", {
      cause: { status: 403 },
    });
  }
  await comment.update({
    content,
  });
  return comment;
};
//3
export const findOrCreate= async(inputs)=>{
    const { userId, postId, content } = inputs;
 if (!userId || !postId || !content) {
    throw new Error("userId and postId and content are required");
  }

  const [commentData, created] =await comment.findOrCreate({
    where:{content,userId,postId}
  })
  return {comment:commentData, created} 
} 
// 5
export const retrieveLast3Comment = async (postid) => {
    if (!postid) throw new Error("postid is required");

  const getData = await comment.findAll({
    where: {postid},
    order:[["createdAt","DESC"]],
    limit:3
  });

  return getData;
}
//4
export const retrieveAllComment = async (keyword) => {
  const getData = await comment.findAndCountAll({
    where: { content: { [Op.substring]: `%${keyword}%`} },
  });
  if (getData.rows.length === 0) throw new Error("no comment found",{cause:{status:404}});

  return getData;
};
// 6
export const getCommentByBK = async (inputs) => {
  const getComment = await comment.findByPk(inputs.id, {
    attributes: ["id", "content"],
    include: [
      { model: UserModel, attributes: ["id", "name", "email"] },
      {
        model: Post,
        attributes: ["id", "title", "content"],
      },
    ],
  });
  if (!getComment) {
    
    throw new Error("comment not found",{ cause:{ status:404}});
  }
  return getComment;
};
