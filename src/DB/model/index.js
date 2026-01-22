export * from './user.model.js' 
export * from"./post.model.js"
export * from"./comment.model.js"
import { UserModel } from "./user.model.js";
import { PostModel } from "./post.model.js";
import { commentModel } from "./comment.model.js";

// relations
UserModel.hasMany(PostModel, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
PostModel.belongsTo(UserModel, { foreignKey: "userId" });
PostModel.hasMany(commentModel, { foreignKey: "postId" , onDelete: "CASCADE", onUpdate: "CASCADE" });
commentModel.belongsTo(PostModel, {  foreignKey: "postId"});
UserModel.hasMany(commentModel, {  foreignKey: "userId" , onDelete: "CASCADE", onUpdate: "CASCADE" });
commentModel.belongsTo(UserModel, {  foreignKey: "userId"  });