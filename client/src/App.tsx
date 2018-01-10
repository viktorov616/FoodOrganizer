import * as React from 'react';

import Header     from './Header/Header';

import { Route }  from 'react-router-dom';
import { hot }    from 'react-hot-loader';

const App: React.SFC = () => (
  <React.Fragment>
    <Route path="/" component={Header} />
  </React.Fragment>
);

export default hot(module)(App);
