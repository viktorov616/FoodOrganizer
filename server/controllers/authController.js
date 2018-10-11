const mongoose = require('mongoose');
const passport = require('passport');
const crypto   = require('crypto');
const dateFns  = require('date-fns');

const User = mongoose.model('User');

// exports.login = passport.authenticate('local');
exports.login = (req, res, next) => passport.authenticate('local', (err, user) => {
  if (err) return next(err);
  if (!user) {
    res.status(401);
    return res.json({ errors: ['Incorrect email or password'] });
  }

  return req.login(user, (loginErr) => {
    if (loginErr) return next(loginErr);

    return next();
  });
})(req, res, next);

exports.logout = (req, res) => {
  req.logout();
  res.json({ notice: 'Successfully logout' });
};

exports.getUser = (req, res) => {
  if (!req.user) return res.json(null);

  const {
    _id,
    name,
    email,
  } = req.user;

  return res.json({
    _id,
    name,
    email,
  });
};

exports.resetPassword = async (req, res) => {
  console.log(req.body.email)
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.json({ errors: ['No account with that email exists'] });
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = dateFns.addDays(Date.now(), 1);
  await user.save();

  const resetURL = `//${req.headers.host}.account/password_reset/${user.resetPasswordToken}`;
  return res.json({ resetURL });
};

exports.validateToken = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.query.token,
    resetPasswordExpires: { $gt: Date.now() }
  })

  res.json(!!user);
}

