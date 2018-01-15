const express          = require('express');
const session          = require('express-session');
const mongoose         = require('mongoose');
const MongoStore       = require('connect-mongo')(session);
const path             = require('path');
const cookieParser     = require('cookie-parser');
const bodyParser       = require('body-parser');
const passport         = require('passport');
const promisify        = require('es6-promisify');
const flash            = require('connect-flash');
const expressValidator = require('express-validator');
const routes           = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'server/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/', routes);

module.exports = app;
