const express            = require('express');
const session            = require('express-session');
const mongoose           = require('mongoose');
const MongoStore         = require('connect-mongo')(session);
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const passport           = require('passport');
const expressValidator   = require('express-validator');
const routes             = require('./routes');
const errorHandlers      = require('./handlers/errorHandlers');
const React              = require('react');
const App                = require('client/src/App');
const recipesStore       = require('client/src/stores/recipes');
const notificationsStore = require('client/src/stores/notifications');
const userStore          = require('client/src/stores/user');
const history            = require('client/src/history');
const { RouterStore }    = require('mobx-react-router');


const { AppContainer }   = require('react-hot-loader');
const { Provider }       = require('mobx-react');
const { Router }         = require('react-router-dom');

const { renderToString } = require('react-dom/server');

const routingStore = new RouterStore();

require('./handlers/passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(cookieParser(process.env.SECRET));

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.validationErrors);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

app.get('/*', (res, req) => {
  const jsx = (
    <AppContainer>
      <Provider
        notificationsStore={notificationsStore}
        recipesStore={recipesStore}
        userStore={userStore}
        routing={routingStore}
      >
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </AppContainer>
  );
  const reactDom = renderToString(jsx);

  req.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(getHtmlTemplate(reactDom));
});

function getHtmlTemplate(reactDom) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Food Organizer</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!-- <link rel="stylesheet" href="/public/assets/style.min.css"> -->
        <script src="/public/assets/app.bundle.js" defer></script>
      </head>
      <body>
        <div id="root">${reactDom}</div>
      </body>
    </html>
  `;
}


module.exports = app;
