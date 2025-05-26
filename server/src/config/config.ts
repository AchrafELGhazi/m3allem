import dotenv from "dotenv";

dotenv.config();

const ENV = process.env.NODE_ENV;

const config = {
  nodeEnv: ENV,
  isDev: ENV === "development",
  isProd: ENV === "production",
  isTest: ENV === "test",

  // Server
  port: parseInt(process.env.PORT || "3000", 10),
  host: process.env.HOST || "http://localhost",
  baseUrl:
    ENV === "development"
      ? `http://localhost:${process.env.PORT}`
      : process.env.PROD_URL || "https://api.m3allem.com",

  // API
  apiVersion: process.env.API_VERSION,

  // Database
  database: {
    uri: ENV === "production" ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI_DEV,
  },

  // CORS
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },

  // Security
  rateLimits: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "900000", 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
  },

  // Request limits
  requestLimits: {
    json: process.env.JSON_LIMIT || "10mb",
    urlencoded: process.env.URLENCODED_LIMIT || "10mb",
  },
};

const requiredEnvVars = [
  "MONGODB_URI_DEV",
  ...(ENV === "production" ? ["MONGODB_URI_PROD", "PROD_URL"] : []),
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default config;
