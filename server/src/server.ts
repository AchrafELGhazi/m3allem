import app from "./app";
import { connectDatabase } from "./config/database";
import logger from "./config/logger";
import config from "./config/config";

process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught Exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.fatal({ reason, promise }, "Unhandled Rejection");
  process.exit(1);
});

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    const server = app.listen(config.port, config.host, () => {
      logger.info(
        {
          service: "M3allem API Server",
          port: config.port,
          environment: config.nodeEnv,
          baseUrl: config.baseUrl,
          apiVersion: config.apiVersion,
        },
        `M3allem API Server started on port ${config.port}`
      );
    });

    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}, starting graceful shutdown`);

      server.close(async () => {
        logger.info("HTTP server closed");

        try {
          logger.info("🛑 M3allem API Server shutting down: Graceful shutdown completed");
          process.exit(0);
        } catch (error) {
          logger.error({ err: error }, "Error during graceful shutdown");
          process.exit(1);
        }
      });

      setTimeout(() => {
        logger.error("Could not close connections in time, forcefully shutting down");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    logger.fatal({ err: error }, "Failed to start server");
    process.exit(1);
  }
};

startServer();
