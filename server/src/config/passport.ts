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
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          user.lastLoginAt = new Date();
          await user.save();
          return done(null, user);
        }

        const email = profile.emails?.[0]?.value;
        if (email) {
          user = await User.findOne({ email });

          if (user) {
            user.googleId = profile.id;
            user.isGoogleUser = true;
            user.authProvider = "google";
            user.isVerified = true;
            user.lastLoginAt = new Date();

            if (!user.profilePicture && profile.photos?.[0]?.value) {
              user.profilePicture = profile.photos[0].value;
            }

            await user.save();
            return done(null, user);
          }
        }

        const newUser = new User({
          googleId: profile.id,
          firstName: profile.name?.givenName || "",
          lastName: profile.name?.familyName || "",
          email: email || "",
          isGoogleUser: true,
          authProvider: "google",
          isVerified: true,
          isActive: true,
          phone: "",
          userType: "customer",
          profilePicture: profile.photos?.[0]?.value || null,
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
