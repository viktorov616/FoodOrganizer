import * as React               from 'react';
import * as ReactDOM            from 'react-dom';

import App                      from 'src/App';
import recipesStore             from 'stores/recipes';
import notificationsStore       from 'stores/notifications';

import { AppContainer }         from 'react-hot-loader';
import { RouterStore,
         syncHistoryWithStore } from 'mobx-react-router';
import { Provider }             from 'mobx-react';
import { BrowserRouter,
         Route }                from 'react-router-dom';
import { enableLogging }        from 'mobx-logger';
import { useStrict }            from 'mobx';

import './styles/style.scss';

useStrict(true);

const routingStore = new RouterStore();
const content = (
  <Provider
    notificationsStore={notificationsStore}
    recipesStore={recipesStore}
    routing={routingStore}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <AppContainer>
    { content }
  </AppContainer>,
  document.getElementById('root'),
);

enableLogging({
  action: true,
  reaction: true,
  transaction: true,
  compute: true,
});

