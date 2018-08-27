import * as React         from 'react';
import * as ReactDOM      from 'react-dom';

import App                from 'src/App';
import recipesStore       from 'stores/recipes';
import notificationsStore from 'stores/notifications';
import userStore          from 'stores/user';

import { AppContainer }   from 'react-hot-loader';
import { RouterStore }    from 'mobx-react-router';
import { Provider }       from 'mobx-react';
import { BrowserRouter }  from 'react-router-dom';
import { enableLogging }  from 'mobx-logger';
import { configure }      from 'mobx';

import './styles/style.scss';

configure({ enforceActions: true });

const routingStore = new RouterStore();

ReactDOM.render(
  <AppContainer>
    <Provider
      notificationsStore={notificationsStore}
      recipesStore={recipesStore}
      userStore={userStore}
      routing={routingStore}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
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

