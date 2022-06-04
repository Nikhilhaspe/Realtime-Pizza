const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) { return done("Error in finding user ", err); }
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
                bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        return done(null, user, 'Logged in successfully');
                    }
                    return done(null, false, { message: 'Invalid Email/Password' });
                }).catch(err => {
                    return done(null, false, { message: 'Something went wrong' });
                });
            });
        }
    ));

    passport.serializeUser((user, done) => {
        // STORING USER'S ID IN THE SESSION
        done(null, user._id);
    });

    // WHEN WE NEED TO USE req.user, THEN THIS METHOD IS INVOKED IMPLICITELY
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = init;  