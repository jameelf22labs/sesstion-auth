import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../error";
import { CommonUtils } from "../util/common.util";
import { RedisLib } from "../lib/redis.lib";
import { RedisSessionPayload } from "../dtos";
import { UserQueryHelper } from "../helper";
import { AuthenticatedRequest } from "../types";

const sessionMiddleware = async (
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction
) => {
  const connectsid = request.headers["connect.sid"] as string;
  if (!connectsid) throw new BadRequestError("User not found. Please login");

  const sessionKey = CommonUtils.getSessionId(connectsid);
  if (!sessionKey) throw new BadRequestError("User not found. Please login");

  const payload = await RedisLib.getParsed<RedisSessionPayload>(sessionKey);
  if (!payload) throw new BadRequestError("User not found. Please login");

  const user = await UserQueryHelper.findByEmail(payload.user.email);
  if (!user) throw new BadRequestError("User not found. Please login");

  request.user = user;
  request.sessionKey = sessionKey;

  next();
};

export default sessionMiddleware;
