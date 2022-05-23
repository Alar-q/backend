const UserModel = require('./models/User');

const passport = require("passport");
const bcrypt = require('bcrypt');

/* Passport Local Strategy */
const LocalStrategy = require('passport-local');
// Немного(сильно) запутанная логика кажется
passport.use(new LocalStrategy({passReqToCallback: true},
    (req, username, passwrd, done) => {
        UserModel.findOne({username})
            .then((user) => {
                // email is required, but for some strategies not? idk
                if (!user || req.body.email) {
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        const newUser = {
                            username: req.body.username, // то что не нашлось пользователей под ником, значит username is unique
                            email: req.body.email, // Надо бы тоже сделать уникальным
                            password: hash,
                            authType: 'local',
                        }
                        UserModel.create(newUser)
                            .then(created => done(null, created)) // если ошибка, то created=null
                            .catch(e=>console.log(e));
                    });
                }
                else {                //login
                    bcrypt.compare(passwrd, user.password, (err, same)=>{
                        if(!same)
                            return done(null, false);
                        else return done(null, user);
                    })

                }
            }).catch(e=>console.log(e));
        }
))


/* Passport Google Strategy */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = '713132958004-85fo8v3v1tb3l5uh8br108i0g12ugic8.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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'
passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        const info = profile._json;

        UserModel.findOne({email: info.email})
            .then(user => {
                if(user){
                    return cb(null, user);
                }
                else{
                    const newUser = {
                        username: info.name,
                        email: info.email,
                        authType: 'google',
                    };
                    UserModel.create(newUser)
                        .then(created => cb(null, created))
                        .catch(e=>console.log(e));
                }
            })
            .catch(e=>console.log(e));
    }
));


passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user, done){
    done(null, user);
});

