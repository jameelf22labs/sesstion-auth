import express from "express";
import { createRedisConnect, env, sequelize } from "./config";
import { RedisStore } from "connect-redis";
import session from "express-session";

const application = async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const redisClient = await createRedisConnect();

    const redisStore = new RedisStore({
      client: redisClient,
    });

    app.use(
      session({
        store: redisStore,
        secret: env.SessionSecret,
        cookie: {
          secure: true,
          httpOnly: true,
          maxAge: 1000 * 60 * 15, // 15 minutes
        },
      })
    );

    await sequelize.authenticate();
    await sequelize.sync();

    return app;
  } catch (error) {
    throw error;
  }
};

export default application;
