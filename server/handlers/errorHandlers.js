exports.catchErrors = fn => (
  function(req, res, next) {
    return fn(req, res, next).catch(next);
  }
);

exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  return next(err);
};

exports.validationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  const errors = errorKeys.reduce((result, key) => (
    { ...result, errors: [...result.errors, err.errors[key].message] }
  ), { errors: [] });

  res.status(400);
  return res.json(errors);
};

exports.developmentErrors = (err, req, res) => {
  err.stack = err.stack || ''; // eslint-disable-line
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
  };
  res.status(err.status || 500);
  res.format({
    'text/html': () => {
      res.render('error', errorDetails);
    },
    'application/json': () => res.json(errorDetails),
  });
};

exports.productionErrors = (err, req, res) => {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {},
  });
};
