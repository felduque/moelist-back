import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import { User } from "./user.model.js";
import { Manhua } from "../Manhua/manhua.model.js";

export const ManhuaFav = sequelize.define("manhua_fav", {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },

  manhuaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Manhua,
      key: "id",
    },
  },
});
