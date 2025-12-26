import { Request } from "express";
import { User } from "../model";

export type AuthenticatedRequest<T = any> = Request<{}, {}, T> & {
  user?: User;
  sessionKey?: string;
};
