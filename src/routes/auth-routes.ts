import { Router } from "express";
import { AuthHandler } from "../controller";

const authRouter = Router();

authRouter.post("/auth/sign-up", AuthHandler.signUp);
authRouter.post("/auth/login", AuthHandler.login);
authRouter.post("/auth/logout", AuthHandler.logout);

export default authRouter;
