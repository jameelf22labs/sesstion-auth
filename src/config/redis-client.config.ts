import { createClient } from "redis";
import env from "./env.config";

const createRedisConnect = async () => {
  const redisClient = createClient({
    url: env.RedisUrl,
  });

  redisClient.on("error", (error) => {
    console.log("Redis error ", error);
  });

  await redisClient.connect();
  console.log("Redis Connected");

  return redisClient;
};

export default createRedisConnect;
