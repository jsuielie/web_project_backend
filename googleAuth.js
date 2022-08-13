//const { userInfo } = require("os");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    scope: ["profile"],
    passReqToCallback: true
    },
    function verify(req, accessToken, refreshToken, profile, done){
        //console.log(profile);
        return done(null, profile);
    }
))

passport.serializeUser((user, done) => {
    let userInfo = {
        provider: user.provider,
        userId: user.provider + user.id,
        displayName: user.displayName,
        lastName: user.name.familyName,
        firstName: user.name.givenName,
        imageUrl: user.photos[0].value
    }
    done(null, userInfo);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
