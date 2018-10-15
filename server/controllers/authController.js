const mongoose = require('mongoose');
const passport = require('passport');
const crypto   = require('crypto');
const dateFns  = require('date-fns');
const mail     = require('../handlers/mail');

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

exports.sendPasswordToken = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400);
    return res.json({ errors: ['No account with that email exists'] });
  }

  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = dateFns.addDays(Date.now(), 1);
  await user.save();

  const resetURL = `${req.headers.host}/password_reset/${user.resetPasswordToken}`;

  await mail.send({
    user,
    resetURL,
    filename: 'password-reset',
    subject: 'Password Reset',
  });

  return res.json({ notices: ['You have been emailed a password reset link'] });
};

exports.validateToken = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.query.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  const tokenConfirmed = !!user;

  res.json({
    tokenConfirmed,
    ...(!tokenConfirmed ? { errors: ['Invalid token'] } : {}),
  });
};

exports.validatePasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    return next();
  }

  res.status(400);
  res.json({ errors: ['Passwords do not match!'] });
};

exports.changePassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.body.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    return res.json({ errors: ['No account with that email exists'] });
  }

  await user.setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();

  await req.login(updatedUser, (loginErr) => {
    if (loginErr) return res.json({ errors: [loginErr] });
  });

  res.json({ user });
};
