import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

export const Anime = sequelize.define(
  "animes",
  {
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
    status: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    episodes: {
      type: DataTypes.STRING,
    },
    day: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    premiered: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    studios: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    producers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    demography: {
      type: DataTypes.STRING,
    },
    source: {
      type: DataTypes.STRING,
    },
    score: {
      type: DataTypes.STRING,
    },
    popularity: {
      type: DataTypes.STRING,
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    author: {
      type: DataTypes.STRING,
    },
    artist: {
      type: DataTypes.STRING,
    },
    favorites: {
      type: DataTypes.STRING,
    },
    season: {
      type: DataTypes.STRING,
    },
    trailer: {
      type: DataTypes.TEXT,
    },
    opening: {
      type: DataTypes.TEXT,
    },
    urlContent: {
      type: DataTypes.TEXT,
    },
    contentType: {
      type: DataTypes.VIRTUAL,
      get() {
        return `anime`;
      },
      set(value) {
        throw new Error("Do not try to set contentType");
      },
    },
  },
  {
    timestamps: false,
  }
);
