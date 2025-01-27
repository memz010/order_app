import { DataTypes } from "sequelize";
import { ormDriver } from "./ORM.js";

let Session = null;

export const createSessionModel = () => {
  if (!Session) {
    const orm = ormDriver();
    
    Session = orm.define("Session", {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  }
  return Session;
};

export const syncSessionsTable = async () => {
    const Session = createSessionModel();
    await Session.sync({ force: true });
}