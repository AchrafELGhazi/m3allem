import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface JwtPayload {
  userId: string;
  email: string;
  userType: 'customer' | 'professional' | 'admin';
  iat?: number;
  exp?: number;
}

export class JwtUtils {
  private static readonly ACCESS_TOKEN_SECRET =
    process.env.JWT_ACCESS_SECRET || 'your-access-secret-key';
  private static readonly REFRESH_TOKEN_SECRET =
    process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
  private static readonly ACCESS_TOKEN_EXPIRES_IN =
    process.env.JWT_ACCESS_EXPIRES_IN || '15m';
  private static readonly REFRESH_TOKEN_EXPIRES_IN =
    process.env.JWT_REFRESH_EXPIRES_IN || '7d';

  static generateAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  static generateRefreshToken(
    payload: Omit<JwtPayload, 'iat' | 'exp'>
  ): string {
    return jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  static verifyAccessToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  static verifyRefreshToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as JwtPayload;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  static generateTokenPair(payload: Omit<JwtPayload, 'iat' | 'exp'>) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}
