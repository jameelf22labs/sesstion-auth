import { NextFunction, Request, Response } from "express";
import { LoginCredantialDto, SignupDto } from "../dtos";
import { AuthenticatedRequest } from "../types";
import { User } from "../model";
import { AuthProvider } from "../service";

const AuthHandler = {
  login: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await AuthProvider.login(request, request.body as LoginCredantialDto);
      return response
        .status(201)
        .json({ message: "User successfully logged in" });
    } catch (error) {
      next(error);
    }
  },

  signUp: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const newUser = await AuthProvider.signUp(request.body as SignupDto);
      return response.status(201).json({
        message: "User successfully signed up",
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const user = request.user;

      if (!user) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      const sessionKey = request.sessionID;
      await AuthProvider.logout(request, sessionKey, user as User);

      return response
        .status(200)
        .json({ message: "User successfully logged out" });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthHandler;
