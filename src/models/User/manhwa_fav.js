import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import { User } from "./user.model.js";
import { Manhwa } from "../Manhwa/manhwa.model.js";

export const ManhwaFav = sequelize.define("manhwa_fav", {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  manhwaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Manhwa,
      key: "id",
    },
  },
});
