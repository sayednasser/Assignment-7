import { BelongsTo, DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./user.model.js";
import { Post } from "./post.model.js";

export class comment extends Model {}

comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "comment",
  },
);
comment.belongsTo(Post, {
  foreignKey: {
    allowNull: false,
    name: "postId",
  },
});
comment.belongsTo(UserModel, {
  foreignKey: {
    allowNull: false,
    name: "userId",
  },
});
