const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config();
function googleAuth(env) {
    if (env.trim() == "dev") {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/google/callback",
            scope: ["profile"],
            passReqToCallback: true
        }, function verify(req, accessToken, refreshToken, profile, done) {
            profile.id = profile.provider + profile.id;
            return done(null, profile);
        }
        ))
    }

    if (env.trim() == "prod") {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://freecardboard.net/google/callback",
            scope: ["profile"],
            passReqToCallback: true
        }, function verify(req, accessToken, refreshToken, profile, done) {
            profile.id = profile.provider + profile.id;
            return done(null, profile);
        })
        )
    }
}

module.exports = { googleAuth: googleAuth };

