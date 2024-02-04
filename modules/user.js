import { sequelizeInstance } from "../services/database.js";
import { DataTypes, literal } from "sequelize";

const User = sequelizeInstance.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountCreated: {
    type: DataTypes.STRING,
    defaultValue: literal("CURRENT_TIMESTAMP"),
  },
  accountUpdated: {
    type: DataTypes.STRING,
    defaultValue: literal("CURRENT_TIMESTAMP"),
  },
});

User.sync({ force: true }).then(() => {
  console.log("User model is synced");
});

export default User;
