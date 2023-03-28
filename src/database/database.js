import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "postgres://hpvqdxkr:RnJpic9AxvzQZzJ9qrHbzAP1gAzAYAgY@drona.db.elephantsql.com/hpvqdxkr",
  {
    logging: true,
  }
);

export default sequelize;
