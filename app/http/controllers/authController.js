const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController() {
    // CHECKING ROLE OF THE USER SO THAT WE CAN DECIDE CUSTOMER OR ADMIN TO ROUTE PATH AFTER LOG IN
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders';
    }

    return {
        login(req, res) {
            res.render('auth/login.ejs');
        },
        register(req, res) {
            res.render('auth/register.ejs');
        },
        postLogin(req, res, next) {
            const { email, password } = req.body;
            // VALIDATING REQUEST
            if (!email || !password) {
                req.flash('error', 'All fields are required');
                return res.redirect('/register');
            }
            // THIS PASSED FUNCTION IS done CALLBACK
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }
                if (!user) {
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message);
                        return next(err);
                    }

                    return res.redirect(_getRedirectUrl(req));
                });
            })(req, res, next);
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            // VALIDATING REQUEST
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }
            // CHECK FOR MAIL IF UNIQUE OR NOT
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Account already exists');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }
            });
            // IF EVERYTHING IS OKAY :)
            // HASHING PASSWORDS (ENCRYTPTION)
            const hashedPassword = await bcrypt.hash(password, 10);

            // USER CREATION
            const user = new User({
                name,
                email,
                password: hashedPassword
            });

            user.save().then((user) => {
                // TODO: DIRECT LOGIN
                return res.redirect('/');
            }).catch(err => {
                req.flash('error', 'Something went wrong!');
                return res.redirect('/register');
            });
        },
        logout(req, res) {
            req.logout(function (err) {
                if (err) { return next(err); }
                res.redirect('/login');
            });
        }
    }
};

module.exports = authController;