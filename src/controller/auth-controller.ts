import { NextFunction, Request, Response } from "express";
import { loginProvider, signUpProvider } from "../service";
import { LoginCredantialDto, SignupDto } from "../dtos";

export const loginHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const providerResponse = await loginProvider(
      request.body as LoginCredantialDto
    );
  } catch (error) {
    next(error);
  }
};

export const signUpHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const providerResponse = await signUpProvider(request.body as SignupDto);
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
