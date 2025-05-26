import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from '../schemas/auth.schema';

export class AuthController {
  static async register(req: Request<{}, {}, RegisterInput>, res: Response) {
    try {
      const result = await AuthService.register(req.body);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  }

  static async login(req: Request<{}, {}, LoginInput>, res: Response) {
    try {
      const result = await AuthService.login(req.body);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token is required',
        });
      }

      const result = await AuthService.refreshToken(refreshToken);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Token refresh failed',
      });
    }
  }

  static async forgotPassword(
    req: Request<{}, {}, ForgotPasswordInput>,
    res: Response
  ) {
    try {
      const result = await AuthService.forgotPassword(req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Forgot password failed',
      });
    }
  }

  static async resetPassword(
    req: Request<{}, {}, ResetPasswordInput>,
    res: Response
  ) {
    try {
      const result = await AuthService.resetPassword(req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Password reset failed',
      });
    }
  }

  static async changePassword(
    req: Request<{}, {}, ChangePasswordInput>,
    res: Response
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const result = await AuthService.changePassword(req.user.id, req.body);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : 'Password change failed',
      });
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const profile = await AuthService.getProfile(req.user.id);

      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: profile,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : 'Profile not found',
      });
    }
  }

  static async logout(req: Request, res: Response) {
    // In a stateless JWT system, logout is typically handled client-side
    // by removing the token from storage. However, you can implement
    // token blacklisting if needed.

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  }
}
