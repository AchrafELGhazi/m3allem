import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User, IUser } from "../db/models/User";
import { Professional } from "../db/models/Professional";

interface GoogleProfile {
  id: string;
  emails?: Array<{ value: string; verified: boolean }>;
  name?: {
    givenName: string;
    familyName: string;
  };
  photos?: Array<{ value: string }>;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile: GoogleProfile, done) => {
      try {
        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // User exists, update last login and return user
          user.lastLoginAt = new Date();
          await user.save();
          return done(null, user);
        }

        // Check if user exists with same email (from regular registration)
        const email = profile.emails?.[0]?.value;
        if (email) {
          user = await User.findOne({ email });

          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            user.isGoogleUser = true;
            user.authProvider = "google";
            user.isVerified = true; // Google users are pre-verified
            user.lastLoginAt = new Date();

            // Update profile picture if not set
            if (!user.profilePicture && profile.photos?.[0]?.value) {
              user.profilePicture = profile.photos[0].value;
            }

            await user.save();
            return done(null, user);
          }
        }

        // Create new user - but we need to redirect to complete profile
        // For now, we'll store the Google profile data temporarily
        const newUser = new User({
          googleId: profile.id,
          firstName: profile.name?.givenName || "",
          lastName: profile.name?.familyName || "",
          email: email || "",
          isGoogleUser: true,
          authProvider: "google",
          isVerified: true,
          isActive: true,
          phone: "", // Will be completed later
          userType: "customer", // Default, can be changed during profile completion
          profilePicture: profile.photos?.[0]?.value || null,
          // No address required at signup
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.error("Google OAuth error:", error);
        return done(error as Error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
