require("dotenv/config");

const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/Users");


const domainURL = process.env.DOMAIN;
const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL;


const googleAuth = () => {
    passport.use(
        new GoogleStrategy.Strategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${domainURL}/api/v1/${googleCallbackURL}`,
        }, (accessToken, refreshToken, profile, done) => {


            User.findOne({ googleId: profile.id }).then((user) => {
                if (!user) {
                    User.create({
                        username: profile._json.given_name,
                        email: profile._json.email,
                        googleId: profile.id,
                        isEmailVerified: profile._json.email_verified,
                        provider: "google",
                    })
                        .then((user) => {
                            done(null, user);
                        })
                        .catch((err) => {
                            return done(err, false);
                        });
                } else {
                    done(null, user)
                }
            })
        }
        )
    )
}

module.exports = googleAuth;