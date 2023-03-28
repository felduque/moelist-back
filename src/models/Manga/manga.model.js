import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

export const Manga = sequelize.define("mangas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.TEXT,
  },
  day: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  source: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  chapters: {
    type: DataTypes.STRING,
  },
  demography: {
    type: DataTypes.STRING,
  },

  volumes: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.STRING,
  },
  genres: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  authors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  artists: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  score: {
    type: DataTypes.STRING,
  },
  popularity: {
    type: DataTypes.STRING,
  },
  urlContent: {
    type: DataTypes.TEXT,
  },
  contentType: {
    type: DataTypes.VIRTUAL,
    get() {
      return `manga`;
    },
    set(value) {
      throw new Error("Do not try to set contentType");
    },
  },
});
