const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/Users");
const generateToken = require("./generateToken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          const email = profile?.emails[0].value;
          const randomHex = () => {
            return [...Array(12)]
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join("");
          };
          const newUser = new User({
            username: profile.displayName,
            email: email,
            password: randomHex(),
            googleId: profile.id,
            isEditor: false,
            isAdmin: false,
          });
          if (newUser) {
            generateToken(request.res, newUser._id);
            const savedUser = await newUser.save();
            console.log(savedUser);
            return done(null, savedUser);
          }
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (request, id, done) {
  try {
    const user = await User.findById(id);
    // generateToken(request.res, newUser._id);
    done(null, user);
    // console.log("done", user);
    // console.log(done)
  } catch (error) {
    done(error, null);
  }
});
