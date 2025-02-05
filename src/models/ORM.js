import { Sequelize } from "sequelize";
import { createUserModel } from './user.js';
import { createStoreModel } from './store.js';
import { createProductModel } from './Product.js';
import { createSessionModel } from './session.js';

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

    // تعريف النماذج
    const User = createUserModel();
    const Store = createStoreModel();
    const Product = createProductModel();
    const Session = createSessionModel();

    // تعريف العلاقات
    if (Store.associate) {
      Store.associate({ Product });
    }
    if (Product.associate) {
      Product.associate({ Store });
    }
    // يمكنك إضافة علاقات أخرى هنا
  }
  return sequelize;
};

export const removeOrmDriver = () => {
  sequelize = null;
};