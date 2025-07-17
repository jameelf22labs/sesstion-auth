import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../error";

import { AuthenticatedRequest } from "../types";

export const checkUserHandler = async (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = request.user;

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
