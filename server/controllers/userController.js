const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password Cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password Cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) res.status(400).json({ errors: errors.map(({ msg }) => msg) });

  return next();
};

exports.register = async (req, res, next) => {
  console.log('CONTROLLER');

  const {
    email,
    name,
    password,
  } = req.body;
  const user = new User({
    email,
    name,
  });

  await User.register(user, password);

  return next();
};
