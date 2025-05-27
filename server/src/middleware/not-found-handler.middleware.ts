import { Request, Response } from "express";
import logger from "../config/logger";

export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn({ url: req.originalUrl, method: req.method }, "Route not found");
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.originalUrl,
  });
};
