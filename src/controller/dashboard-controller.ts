import { NextFunction, Request, Response } from "express";
import { CommonUtils } from "../util/common.util";
import { BadRequestError } from "../error";
import { RedisLib } from "../lib/redis.lib";
import { RedisSessionPayload } from "../dtos";
import { UserQueryHelper } from "../helper";

export const checkUserHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const connectsid = request.headers["connect.sid"] as string;

    if (!connectsid) {
      throw new BadRequestError("User not found. Please login");
    }

    const sessionKey = CommonUtils.getSessionId(connectsid);

    if (!sessionKey) {
      throw new BadRequestError("User not found. Please login");
    }

    const payload = await RedisLib.getParsed<RedisSessionPayload>(sessionKey);

    if (!payload) {
      throw new BadRequestError("User not found. Please login");
    }

    const user = await UserQueryHelper.findByEmail(payload.user.email);

    if (!user) {
      throw new BadRequestError("User not found. Please login");
    }

    return response.status(200).json({
      message: "User is Exist",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};
