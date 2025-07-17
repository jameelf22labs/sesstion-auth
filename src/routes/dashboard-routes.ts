import { Router } from "express";
import { checkUserHandler } from "../controller";

const dashboardRouter = Router();

dashboardRouter.get('/check-user' , checkUserHandler);

export default dashboardRouter;