import { DataTypes } from "sequelize";
import { ormDriver } from "./ORM.js";

let Store = null;

export const createStoreModel = () => {
  if (!Store) {
    const orm = ormDriver();
    
    Store = orm.define("Store", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });

    Store.associate = (models) => {
      Store.hasMany(models.Product, { 
        foreignKey: 'storeId',
        as: 'products'
      });
    };
  }
  return Store;
};

export const createStoresTable = async () => {
  const Store = createStoreModel();
  await Store.sync({ alter: true });
};