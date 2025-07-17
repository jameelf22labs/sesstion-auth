import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError, UnAuthorized } from "../error";

const globalErrorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal Server Error" });
};


export default globalErrorMiddleware;