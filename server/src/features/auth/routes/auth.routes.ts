import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "../schemas/auth.schema";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateSchema } from "../../../middleware/schema-validator.middleware";

const authRouter = Router();

// Public routes
authRouter.post("/register", validateSchema(registerSchema), AuthController.register);
authRouter.post("/login", validateSchema(loginSchema), AuthController.login);
authRouter.post("/refresh-token", AuthController.refreshToken);
authRouter.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  AuthController.forgotPassword
);
authRouter.post(
  "/reset-password",
  validateSchema(resetPasswordSchema),
  AuthController.resetPassword
);

// Protected routes
authRouter.post(
  "/change-password",
  authenticateToken,
  validateSchema(changePasswordSchema),
  AuthController.changePassword
);
authRouter.get("/profile", authenticateToken, AuthController.getProfile);
authRouter.post("/logout", authenticateToken, AuthController.logout);

export default authRouter;
