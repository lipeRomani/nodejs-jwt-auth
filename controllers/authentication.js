const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret);
}

exports.signup = (req, res, next) => {
  
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({"error": "You must provide email and password"});
  }

  User.findOne({ email }, (err, existingUser) => {
    
    if (err) {
      return next(err);
    }
    
    if (existingUser) {
      return res.status(409).send({error: `User ${email} already exists`});
    } else {
      new User({ email, password })
        .save()
        .then(result =>{
          return res.status(201).send({ token: tokenForUser(result) })
        })
        .catch(err => next(err));
    }
  });

}