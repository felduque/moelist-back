import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import { User } from "./user.model.js";
import { Manga } from "../Manga/manga.model.js";

export const MangaFav = sequelize.define("manga_fav", {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  mangaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Manga,
      key: "id",
    },
  },
});
