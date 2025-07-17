import { Router } from "express";
import { AuthHandler } from "../controller";
import { sessionMiddleware } from "../middleware";

const authRouter = Router();

authRouter.post("/auth/sign-up", AuthHandler.signUp);
authRouter.post("/auth/login", AuthHandler.login);
authRouter.post("/auth/logout", sessionMiddleware ,  AuthHandler.logout);

export default authRouter;
