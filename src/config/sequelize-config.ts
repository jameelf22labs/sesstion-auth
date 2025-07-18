import env from "./env.config";
import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { User } from "../model";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: "session_api",
  user: env.Postgres.user,
  password: env.Postgres.pass,
  host: env.Postgres.host,
  port: env.Postgres.port,
  clientMinMessages: "notice",
  models: [User],
});

export default sequelize;
