import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

import config from "./config/config";
import logger from "./config/logger";
import { apiRateLimiter } from "./middleware/rate-limiter.middleware";
// import { apiRouter } from './src/routes';

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: config.isDev ? false : undefined,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS
app.use(cors(config.cors));

// Compression
app.use(compression());

// Logging middleware (use custom logger in production)
if (config.isDev) {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message: string) => {
          logger.info(message.trim());
        },
      },
    })
  );
}

// Body parsing
app.use(
  express.json({
    limit: config.requestLimits.json,
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: config.requestLimits.urlencoded,
  })
);

// Rate limiting
app.use("/api", apiRateLimiter);

// Health check endpoint
app.get("/health", (req, res) => {
  const healthCheck = {
    status: "OK",
    message: "M3allem API is running",
    timestamp: new Date().toISOString(),
    version: config.apiVersion,
    environment: config.nodeEnv,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  };

  logger.debug({ healthCheck }, "Health check requested");
  res.status(200).json(healthCheck);
});

// API routes
// app.use('/api', apiRouter); // Uncomment when ready

// 404 handler
app.use("*", (req, res) => {
  logger.warn({ url: req.originalUrl, method: req.method }, "Route not found");
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(
    {
      err: error,
      req: {
        method: req.method,
        url: req.url,
        headers: req.headers,
      },
    },
    "Unhandled error"
  );

  res.status(error.status || 500).json({
    status: "error",
    message: config.isDev ? error.message : "Internal server error",
    ...(config.isDev && { stack: error.stack }),
  });
});

export default app;
