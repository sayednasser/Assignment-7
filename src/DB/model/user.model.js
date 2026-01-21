export const users = [];
import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      customValidator(value) {
          if (!value || value.length <2) {
            throw new Error("name cannot be empty or length cannot be less 2")
          }
          }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {message:"please Enter valid email format like example@gmail.com"}
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      customValidator(value) {
          if (!value || value.length < 6) {
            throw new Error("password cannot be empty or length cannot be less 6")

          }
        }
      
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
  
);

