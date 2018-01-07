import * as React               from 'react';
import * as ReactDOM            from 'react-dom';

import { AppContainer }    from 'react-hot-loader';
// import { ConnectedRouter } from 'react-router-redux';
// import { Provider }        from 'react-redux';
import { Route }           from 'react-router-dom';
import { enableLogging }   from 'mobx-logger';

// import App from './pages/App';

// import store, { history } from './store';

import './style.scss';

// const content = (
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <Route path="/" component={App} />
//     </ConnectedRouter>
//   </Provider>
// );
console.log(document.getElementById('root'));
const renderRoot = () => {
  ReactDOM.render(
    <div>Hello</div>,
    document.getElementById('root'),
  );
};

renderRoot();

// if (module.hot) {
//   module.hot.accept('./pages/App', () => { renderRoot(); });
// }

enableLogging({
  action: true,
  reaction: true,
  transaction: true,
  compute: true,
});

