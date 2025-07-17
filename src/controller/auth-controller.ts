import { NextFunction, Request, Response } from "express";
import { loginProvider, signUpProvider } from "../service";
import { LoginCredantialDto, SignupDto } from "../dtos";

export const loginHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = await loginProvider(request.body as LoginCredantialDto);

    request.session.user = {
      uuid: user.uuid,
      email: user.email,
    };

    await request.session.save();
    return response.status(201).json({ message: "User successfully login" });
  } catch (error) {
    request.session.destroy(() => {});
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
    return response
      .status(201)
      .json({ message: "User successfully signup", user: providerResponse });
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
