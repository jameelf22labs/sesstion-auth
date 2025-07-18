import Redis from "ioredis";
import env from "./env.config";

const redisClient = new Redis(env.RedisUrl || "redis://redis:6379");

redisClient.on("connect", () => {
  console.log("Redis Connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

export default redisClient;
