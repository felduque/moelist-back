import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

export const Scan = sequelize.define("Scans", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});
