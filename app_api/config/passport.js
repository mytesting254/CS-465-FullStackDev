const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
    }, 
    (username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
                if (err) return done(err);
                // if user not found
                if (!user) return done(null, false, { message: 'Incorrect username.' });
                // if password is wrong
                if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });
                // if credentials are correct, return the user object
                return done(null, user);
            }
        );
    }
));