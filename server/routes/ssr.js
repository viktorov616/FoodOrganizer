const React              = require('react');
const App                = require('../../client/src/App.tsx').default;
const express            = require('express');
const recipesStore       = require('../../client/src/stores/recipes.ts').default;
const notificationsStore = require('../../client/src/stores/notifications.ts').default;
const userStore          = require('../../client/src/stores/user.ts').default;
const { RouterStore }    = require('mobx-react-router');

const { AppContainer }   = require('react-hot-loader');
const { Provider }       = require('mobx-react');
const { StaticRouter }   = require('react-router-dom');

const { renderToString } = require('react-dom/server');

const router = express.Router();
const routingStore = new RouterStore();

router.get('/', (req, res) => {
  const jsx = (
    <AppContainer>
      <Provider
        notificationsStore={notificationsStore}
        recipesStore={recipesStore}
        userStore={userStore}
        routing={routingStore}
      >
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    </AppContainer>
  );
  const reactDom = renderToString(jsx);

  res.writeHead(200, { 'Content-Type': 'text/html' });
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
        <link rel="stylesheet" href="style.min.css">
        <script src="app.bundle.js" defer></script>
      </head>
      <body>
        <div id="root">${reactDom}</div>
      </body>
    </html>
  `;
}

module.exports = router;
