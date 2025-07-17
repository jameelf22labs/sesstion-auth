type EnvConfig = {
  Port: number;
  RedisUrl: string;
  SessionSecret: string;
};

const env: EnvConfig = {
  Port: Number(process.env.PORT),
  RedisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  SessionSecret:
    process.env.SESSION_SECRET || "hello__________it_________secured",
};

export default env;
