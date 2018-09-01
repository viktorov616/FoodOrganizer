const passport = require('passport');

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

