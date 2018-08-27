const Authentication = require('./controllers/authentication');
const PassportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    return res.send({hi: `Ola ${req.user.email}`});
  });

  app.post('/signup', Authentication.signup);
};