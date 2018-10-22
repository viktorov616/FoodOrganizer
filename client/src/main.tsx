import * as React         from 'react';
import * as ReactDOM      from 'react-dom';

import App                from 'src/App';
import recipesStore       from 'stores/recipes';
import notificationsStore from 'stores/notifications';
import userStore          from 'stores/user';
import history            from './history';

import { AppContainer }   from 'react-hot-loader';
import { RouterStore }    from 'mobx-react-router';
import { Provider }       from 'mobx-react';
import { Router }         from 'react-router-dom';
import { enableLogging }  from 'mobx-logger';
import { configure }      from 'mobx';

import './styles/style.scss';

configure({ enforceActions: 'observed' });

const routingStore = new RouterStore();

ReactDOM.hydrate(
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
  </AppContainer>,
  document.getElementById('root'),
);

enableLogging({
  action: true,
  reaction: true,
  transaction: true,
  compute: true,
});
