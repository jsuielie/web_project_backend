const passport = require("passport");
function serializeAndDeserialize() {
    passport.serializeUser((user, done) => {
        let userInfo;
        if (user.provider === "google") {
            userInfo = {
                provider: user.provider,
                userId: user.id,
                displayName: user.displayName,
                lastName: user.name.familyName,
                firstName: user.name.givenName,
                imageUrl: user.photos[0].value
            };
        }

        if (user.provider === "local") {
            userInfo = {
                provider: user.provider,
                userId: user.userId,
                displayName: user.displayName,
                lastName: user.lastName,
                firstName: user.firstName,
                imageUrl: user.imageUrl
            };
        }
        done(null, userInfo);
    });

    passport.deserializeUser((user, done) => {
        console.log(user);
        done(null, user);
    });
}

module.exports = {serializeAndDeserialize : serializeAndDeserialize};
