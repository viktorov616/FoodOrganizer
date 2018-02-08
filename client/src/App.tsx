import * as React   from 'react';

import AddRecipe    from 'pages/AddRecipe';
import Header       from './Header/Header';
import RandomRecipe from 'pages/RandomRecipe';
import RecipeList   from 'pages/RecipeList';

import { Route }    from 'react-router-dom';
import { hot }      from 'react-hot-loader';

const App: React.SFC = () => (
  <React.Fragment>
    <Route path="/" component={Header} />
    <Route exact path="/" component={RecipeList} />
    <Route path="/random" component={RandomRecipe} />
    <Route path="/add" component={AddRecipe} />
  </React.Fragment>
);

export default hot(module)(App);
