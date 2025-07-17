import dotenv from "dotenv";
dotenv.config();

type EnvConfig = {
  Port: number;
  RedisUrl: string;
  SessionSecret: string;
  Postgres: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };
};

const env: EnvConfig = {
  Port: Number(process.env.PORT) || 9090,
  RedisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  SessionSecret:
    process.env.SESSION_SECRET || "hello__________it_________secured",

  Postgres: {
    host: process.env.POSTGRESS_HOST || 'localhost',
    port: Number(process.env.POSTGRESS_PORT),
    user: process.env.POSTGRESS_USERNAME || "root",
    pass: process.env.POSTGRESS_PASSWORD || "root",
  },
};

export default env;
