import { Sequelize } from "sequelize";

/**
 * @type {Sequelize}
 */
let sequelize = null;

export const ormDriver = () => {
  if (!sequelize) {
    const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      dialect: "mysql",
    });
  }
  return sequelize;
};

export const removeOrmDriver = () => {
  sequelize = null;
};
