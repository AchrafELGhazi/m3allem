import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id:Types.ObjectId
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female";

  // Account Information
  userType: "customer" | "professional" | "admin";
  isVerified: boolean;
  isActive: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  // OAuth related
  googleId?: string;
  isGoogleUser: boolean;
  authProvider: "local" | "google";

  // Profile completion status
  isProfileComplete: boolean;

  // Profile (optional at signup)
  profilePicture?: string;
  address?: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };

  // App-specific
  language?: "ar" | "fr" | "en";
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };

  // Timestamps
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  generatePasswordResetToken(): string;
  getFullName(): string;
  checkProfileCompletion(): boolean;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.authProvider === "local";
      },
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    phone: {
      type: String,
      required: false,
      sparse: true,
      match: [/^(\+212|0)[5-7]\d{8}$/, "Please enter a valid Moroccan phone number"],
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          return !value || value < new Date();
        },
        message: "Date of birth cannot be in the future",
      },
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    userType: {
      type: String,
      required: true,
      enum: ["customer", "professional", "admin"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    // OAuth fields
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // Profile completion
    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    profilePicture: {
      type: String,
      default: null,
    },
    address: {
      street: String,
      city: String,
      region: {
        type: String,
        enum: [
          "Casablanca-Settat",
          "Rabat-Salé-Kénitra",
          "Marrakech-Safi",
          "Fès-Meknès",
          "Tanger-Tétouan-Al Hoceïma",
          "Oriental",
          "Souss-Massa",
          "Drâa-Tafilalet",
          "Béni Mellal-Khénifra",
          "Laâyoune-Sakia El Hamra",
          "Dakhla-Oued Ed-Dahab",
          "Guelmim-Oued Noun",
        ],
      },
      postalCode: String,
      country: {
        type: String,
        default: "Morocco",
      },
      coordinates: {
        latitude: {
          type: Number,
          min: [-90, "Latitude must be between -90 and 90"],
          max: [90, "Latitude must be between -90 and 90"],
        },
        longitude: {
          type: Number,
          min: [-180, "Longitude must be between -180 and 180"],
          max: [180, "Longitude must be between -180 and 180"],
        },
      },
    },
    language: {
      type: String,
      enum: ["ar", "fr", "en"],
      default: "ar",
    },
    notificationPreferences: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
    },
    lastLoginAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.emailVerificationToken;
        delete ret.emailVerificationExpires;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        return ret;
      },
    },
  }
);

// Indexes
// userSchema.index({ userType: 1 });
// userSchema.index({ googleId: 1 });
userSchema.index({ authProvider: 1 });
userSchema.index({ email: 1, authProvider: 1 });
userSchema.index({ isProfileComplete: 1 });

userSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next();

  try {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12");
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.pre("save", function (next) {
  this.isProfileComplete = this.checkProfileCompletion();
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    if (!this.password) {
      return false;
    }
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Instance method to get full name
userSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};

// Instance method to check profile completion
userSchema.methods.checkProfileCompletion = function (): boolean {
  const requiredFields = [this.firstName, this.lastName, this.email, this.phone];

  const hasRequiredFields = requiredFields.every(
    (field) => field && field.toString().trim() !== ""
  );

  // For professionals, also check if they have professional profile
  if (this.userType === "professional") {
    // This would be checked in the service layer
    return hasRequiredFields;
  }

  return hasRequiredFields;
};

// Instance method to generate password reset token
userSchema.methods.generatePasswordResetToken = function (): string {
  const resetToken = require("crypto").randomBytes(32).toString("hex");
  this.passwordResetToken = require("crypto").createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return resetToken;
};

export const User = mongoose.model<IUser>("User", userSchema);
