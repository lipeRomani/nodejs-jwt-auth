const passport = require('passport');
const config = require('../config');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

//Local Strategy
const localOptions = { 
  usernameField: 'email',
  session: false,
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User
    .findOne({ email })
    .then(user => {
        if (!user) done(null, false);
        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);
          if (!isMatch) return done(null, false);

          return done(null, user);
        });
    })
    .catch(err => done(err));
});

//Jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => user
      ? done(null, user)
      : done(null, false))
    .catch(err => done(err, false));
});

passport.use(jwtLogin);
passport.use(localLogin);