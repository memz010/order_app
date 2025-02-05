import { DataTypes } from "sequelize";
import { ormDriver } from "./ORM.js";

let Product = null;

export const createProductModel = () => { 
  if (!Product) {
    const orm = ormDriver();
    
    Product = orm.define("Product", {
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
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Stores', 
          key: 'id',
        },
      },
    });

    Product.associate = (models) => {
      Product.belongsTo(models.Store, { 
        foreignKey: 'storeId', as: 'store' 
      });
    };
  }
  return Product; 
};


export const createProductsTable = async () => {
  const Product = createProductModel();
  await Product.sync({ alter: true });
};