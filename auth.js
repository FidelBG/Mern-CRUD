const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "838133539590-qsh3qdo93lmnc04om965gd4vmf15ulvv.apps.googleusercontent.com",
            clientSecret: "cGNDftWchpM4LqZcj7Hl_iFC",
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};