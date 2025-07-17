export type RedisSessionPayload = {
  user: {
    uuid: string;
    email: string;
  };

  cookie?: any;
};
