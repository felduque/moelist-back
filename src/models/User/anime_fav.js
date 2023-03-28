import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import { User } from "./user.model.js";
import { Anime } from "../Anime/anime.model.js";

export const AnimeFav = sequelize.define("anime_fav", {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  animeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Anime,
      key: "id",
    },
  },
});
