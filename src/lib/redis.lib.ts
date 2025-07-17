import { redisClient } from "../config";

export const RedisLib = {
  get: (key: string): Promise<string | null> => {
    return redisClient.get(key);
  },

  getParsed: async <T>(key: string): Promise<T | null> => {
    const value = await redisClient.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  },

  delete: (key: string): Promise<number> => {
    return redisClient.del(key);
  },
};
