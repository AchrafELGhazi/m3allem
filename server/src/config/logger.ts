import pino from "pino";
import config from "./config";

const logger = pino({
  transport: config.isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  level: config.isDev ? "debug" : "info",
});

export default logger;
