const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const mysql = require("mysql");

function localAuth(con) {
    return passport.use(new LocalStrategy(
        function verify(username, password, done) {
            let queryString = `SELECT * FROM users WHERE userId = ?`;
            con.query(queryString, [[["local" + username]]], (error, result) => {
                let [user] = result;
                if (error) {
                    console.log(error);
                    return done(error);
                }
                else if (!user) {
                    console.log(`User ${"local" + username} does not exist.`);
                    return done(null, false);
                }
                else {
                    bcrypt.compare(password, user.passwordHash, (error, result) => {
                        if (error || !result) {
                            console.log(error);
                            return done(null, false);
                        }
                        else {
                            return done(null, user);
                        }
                    })
                }
            })
        }
    ))
}

module.exports = { localAuth: localAuth };
