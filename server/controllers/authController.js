const passport = require('passport');

exports.login = passport.authenticate('local');

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

