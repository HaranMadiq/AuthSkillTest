const passport = require('passport');
const googleStretegy = require('passport-google-oauth').OAuth2Strategy;
// require crypto for generating random password

const crypto = require('crypto');
const User = require('../models/User');

// tell passport to use new stretegy for google login
passport.use(new googleStretegy({
        clientID: '568818836495-vcck0lc3jgaqb4uft6t7oo3qm5rdtndg.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/user/auth/google/callback',
        passReqToCallback: true,
    },
    async function(request, accessToken, refreseToken, profile, done) {

        try {
            const user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                return done(null, user);
            }
            if (!user) {
                // if not found, creat user and set it as req.user
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                if (newUser) {
                    return done(null, newUser);
                }
            }
        } catch (error) {
            console.log('error in google stretegy passport', error);
        }
    }
));
module.exports = passport;

