import { BelongsTo, DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./user.model.js";
import { PostModel } from "./post.model.js";

export class commentModel extends Model {}

commentModel.init(
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
    postId: {
  type: DataTypes.INTEGER,
  allowNull: false,
},
userId: {
  type: DataTypes.INTEGER,
  allowNull: false,
},

  },
  {
    sequelize: sequelize,
    modelName: "comment",
  },
);

