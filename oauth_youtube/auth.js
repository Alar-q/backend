const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');

passport.use(new GoogleStrategy({
    clientID:     '713132958004-sflqihd5nf2ls2dtehsvs2q0up4kkv5p.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    console.log(profile);
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(user, done){
  done(null, user);
});