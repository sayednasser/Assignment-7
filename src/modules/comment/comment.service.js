import { Op } from"sequelize";
import { commentModel, PostModel, UserModel } from "../../DB/model/index.js";
//1
export const signup = async (inputs) => {
  const added = await commentModel.bulkCreate(inputs, { validate: true });
  return added;
};
//2
export const updatedCommentByID = async (inputs) => {
  const { id, userId, content } = inputs;
  const comments = await commentModel.findByPk(id);
  if (!comments) {
    throw new Error("comment not found", { cause: { status: 404 } });
  }


  if (Number(comments.userId) !== Number(userId)) {
    throw new Error("Not authorized to update this comment", {
      cause: { status: 403 },
    });
  }
  await comments.update({
    content
  });
  return comments;
};
//3
export const findOrCreate= async(inputs)=>{
    const { userId, postId, content } = inputs;
 if (!userId || !postId || !content) {
    throw new Error("userId and postId and content are required");
  }

  const [commentData, created] =await commentModel.findOrCreate({
    where:{content,userId,postId}
  })
  return {commentModel:commentData, created} 
}; 
//4
export const retrieveAllComment = async (keyword) => {
  const getData = await commentModel.findAndCountAll({
    where: { content: { [Op.substring]: `%${keyword}%`} },
  });
  if (getData.rows.length === 0) throw new Error("no comment found",{cause:{status:404}});

  return getData;
};
// 5
export const retrieveLast3Comment = async (postid) => {
    if (!postid) throw new Error("postid is required");

  const getData = await commentModel.findAll({
    where: {postid},
    order:[["createdAt","DESC"]],
    limit:3
  });

  return getData;
};
// 6
export const getCommentByBK = async (inputs) => {
  const getComment = await commentModel.findByPk(inputs.id, {
    attributes: ["id", "content"],
    include: [
      { model: UserModel, attributes: ["id", "name", "email"] },
      {
        model: PostModel,
        attributes: ["id", "title", "content"],
      },
    ],
  });
  if (!getComment) {
    
    throw new Error("comment not found",{ cause:{ status:404}});
  }
  return getComment;
};
