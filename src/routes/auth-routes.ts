import { Router } from "express";
import { loginHandler, logoutHandler, signUpHandler } from "../controller";

const authRouter = Router();

authRouter.post("/auth/sign-up", signUpHandler);
authRouter.post("/auth/login", loginHandler);
authRouter.post("/auth/logout", logoutHandler);

export default authRouter;
    