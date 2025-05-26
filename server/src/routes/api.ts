import { Router } from "express";
import authRouter from "../features/auth/routes/auth.routes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

export default apiRouter;
