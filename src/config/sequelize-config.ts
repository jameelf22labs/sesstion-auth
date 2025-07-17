import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import env from "./env.config";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: "session_api",
  user: env.Postgres.user,
  password: env.Postgres.pass,
  host: env.Postgres.user,
  port: env.Postgres.port,
  clientMinMessages: "notice",
  models: [],
});

export default sequelize;
