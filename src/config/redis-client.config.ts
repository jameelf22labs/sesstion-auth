import { createClient } from "redis";
import env from "./env.config";

const createRedisConnect = () => {
  const redisClient = createClient({
    url: env.RedisUrl,
  });

  redisClient.on("error", (error) => {
    console.log("Redis error ", error);
  });

  redisClient
    .connect()
    .then(() => console.log("Redis Connected"))
    .catch(console.error);
};

export default createRedisConnect;
