import * as React   from 'react';

import AddRecipe    from 'pages/AddRecipe';
import EditRecipe    from 'pages/EditRecipe';
import Header       from './Header';
import RandomRecipe from 'pages/RandomRecipe';
import Recipe       from 'pages/Recipe';
import RecipeList   from 'pages/RecipeList';

import { Route }    from 'react-router-dom';
import { hot }      from 'react-hot-loader';

const App: React.SFC = () => (
  <React.Fragment>
    <Route path="/" component={Header} />
    <Route exact path="(/|/recipes)" component={RecipeList} />
    <Route exact path="/recipes/:slug" component={Recipe} />
    <Route path="/recipes/:slug/edit" component={EditRecipe} />
    <Route path="/random" component={RandomRecipe} />
    <Route path="/add" component={AddRecipe} />
  </React.Fragment>
);

export default hot(module)(App);
