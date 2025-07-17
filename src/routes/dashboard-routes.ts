import { Router } from "express";
import { checkUserHandler } from "../controller";
import sessionMiddleware from "../middleware/session.middleware";

const dashboardRouter = Router();

dashboardRouter.get("/check-user", sessionMiddleware, checkUserHandler);

export default dashboardRouter;
