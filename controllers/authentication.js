const User = require('../models/user');

exports.signup = (req, res, next) => {
  
  const email = req.body.email;
  const password = req.body.password;

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
          return res.send({
            _id: result._id,
            email: result.email
          }, 201)
        })
        .catch(err => next(err));
    }
  });

}