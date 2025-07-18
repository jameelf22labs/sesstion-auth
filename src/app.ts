import express from "express";
import { env, sequelize } from "./config";
import session from "express-session";
import connectRedis from "connect-redis";
import { authRouter, dashboardRouter } from "./routes";
import { globalErrorMiddleware } from "./middleware";
import redisClient from "./config/redis-client.config";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const application = async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const RedisStore = connectRedis(session);

    console.log("Redis Connected");

    app.use(
      session({
        store: new RedisStore({
          client: redisClient,
        }),
        secret: env.SessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          httpOnly: true,
          maxAge: 1000 * 60 * 15,
        },
      })
    );

    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Sequelize Connected");

    const swaggerDocument = YAML.load(
      path.join(process.cwd(), "src", "swagger.yaml")
    );

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/api/v1", authRouter);
    app.use("/api/v1/dashboard", dashboardRouter);

    app.use(globalErrorMiddleware);

    return app;
  } catch (error) {
    throw error;
  }
};

export default application;
