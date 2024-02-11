import { config } from "dotenv";
config();
import { Sequelize } from "sequelize";

export const sequelizeInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false,
  }
);

export const connection = async () => {
  try {
    await sequelizeInstance.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};
