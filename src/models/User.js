import { DataTypes } from "sequelize";
import { ormDriver } from "./ORM.js";

/**
 * @type {import("sequelize").ModelCtor<Model<any, any>>}
 */

let User = null;

export const createUserModel = () => {
  if (User == null) { 
    const orm = ormDriver();

    User = orm.define("User", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          is: /^09\d{8}$/,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 100],
        },
      },
      profileImage: { 
        type: DataTypes.STRING, 
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      location: { 
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      //role: { 
      //  type: DataTypes.ENUM('user', 'admin'), 
       // allowNull: false,
       // defaultValue: 'user' 
     // },
    });
  }
  return User;
};
export const createUsersTable = async () => {
  const User = createUserModel();
  await User.sync({ alter: true }); 
};
