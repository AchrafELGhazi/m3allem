import crypto from 'crypto';
import { User, IUser } from '../../../db/models/User';
import { Professional } from '../../../db/models/Professional';
import { JwtUtils } from '../utils/jwt';
import {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from '../schemas/auth.schema';

export class AuthService {
  static async register(data: RegisterInput) {
    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new Error('User with this email already exists');
      }
      if (existingUser.phone === data.phone) {
        throw new Error('User with this phone number already exists');
      }
    }

    const user = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      userType: data.userType,
    });

    await user.save();

    if (data.userType === 'professional') {
      const professional = new Professional({
        userId: user._id,
        experienceLevel: 'Snaaï',
        hourlyRate: 100,
        
      });

      await professional.save();
    }

    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      userType: user.userType,
    };

    const tokens = JwtUtils.generateTokenPair(tokenPayload);

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  static async login(data: LoginInput) {
    const user = await User.findOne({ email: data.email }).select('+password');

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated. Please contact support.');
    }

    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Generate tokens
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      userType: user.userType,
    };

    const tokens = JwtUtils.generateTokenPair(tokenPayload);

    return {
      user: this.sanitizeUser(user),
      tokens,
    };
  }

  static async refreshToken(refreshToken: string) {
    try {
      const payload = JwtUtils.verifyRefreshToken(refreshToken);

      // Verify user still exists and is active
      const user = await User.findById(payload.userId);
      if (!user || !user.isActive) {
        throw new Error('User not found or inactive');
      }

      // Generate new tokens
      const tokenPayload = {
        userId: user._id.toString(),
        email: user.email,
        userType: user.userType,
      };

      const tokens = JwtUtils.generateTokenPair(tokenPayload);

      return {
        user: this.sanitizeUser(user),
        tokens,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  static async forgotPassword(data: ForgotPasswordInput) {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      // Don't reveal whether email exists or not
      return {
        message:
          'If an account with that email exists, a password reset link has been sent.',
      };
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // In a real application, you would send an email here
    // For now, we'll just return the token for testing
    return {
      message: 'Password reset token generated successfully',
      resetToken, // Remove this in production
    };
  }

  static async resetPassword(data: ResetPasswordInput) {
    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(data.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error('Invalid or expired password reset token');
    }

    // Update password
    user.password = data.newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return { message: 'Password reset successfully' };
  }

  static async changePassword(userId: string, data: ChangePasswordInput) {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(
      data.currentPassword
    );
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = data.newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  static async getProfile(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    let profile = this.sanitizeUser(user);

    // If user is a professional, include professional data
    if (user.userType === 'professional') {
      const professional = await Professional.findOne({ userId: user._id });
      if (professional) {
        profile = {
          ...profile,
          professional: professional.toObject(),
        };
      }
    }

    return profile;
  }

  private static sanitizeUser(user: IUser) {
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.emailVerificationToken;
    delete userObj.emailVerificationExpires;
    delete userObj.passwordResetToken;
    delete userObj.passwordResetExpires;
    return userObj;
  }
}
