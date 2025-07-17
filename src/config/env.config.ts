type EnvConfig = {
  Port: number;
  RedisUrl: string;
  SessionSecret: string;
  Postgres: {
    host: number;
    port: number;
    user: string;
    pass: string;
  };
};

const env: EnvConfig = {
  Port: Number(process.env.PORT),
  RedisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  SessionSecret:
    process.env.SESSION_SECRET || "hello__________it_________secured",

  Postgres: {
    host: Number(process.env.POSTGRESS_HOST),
    port: Number(process.env.POSTGRESS_PORT),
    user: process.env.POSTGRESS_USERNAME || "root",
    pass: process.env.POSTGRESS_PASSWORD || "root",
  },
};

export default env;
