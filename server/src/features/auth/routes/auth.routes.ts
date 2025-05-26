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

const router = Router();

// Public routes
router.post("/register", validateSchema(registerSchema), AuthController.register);
router.post("/login", validateSchema(loginSchema), AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  AuthController.forgotPassword
);
router.post("/reset-password", validateSchema(resetPasswordSchema), AuthController.resetPassword);

// Protected routes
router.post(
  "/change-password",
  authenticateToken,
  validateSchema(changePasswordSchema),
  AuthController.changePassword
);
router.get("/profile", authenticateToken, AuthController.getProfile);
router.post("/logout", authenticateToken, AuthController.logout);

export default router;
