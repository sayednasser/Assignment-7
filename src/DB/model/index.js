export * from './user.model.js'
export * from"./post.model.js"
export * from"./comment.model.js"
import { UserModel } from "./user.model.js";
import { Post } from "./post.model.js";
import { comment } from "./comment.model.js";

// relations
UserModel.hasMany(Post, { foreignKey: "userid", onDelete: "CASCADE", onUpdate: "CASCADE" });
Post.belongsTo(UserModel, { foreignKey: "userid" });
Post.hasMany(comment, { foreignKey: "postId" });
comment.belongsTo(Post, { foreignKey: "postId" });
 