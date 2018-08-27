import * as React   from 'react';

// @ts-ignore
import AddRecipe    from 'pages/AddRecipe';
// @ts-ignore
import EditRecipe   from 'pages/EditRecipe';
// @ts-ignore
import Header       from './Header';
// @ts-ignore
import RandomRecipe from 'pages/RandomRecipe';
// @ts-ignore
import Recipe       from 'pages/Recipe';
// @ts-ignore
import RecipeList   from 'pages/RecipeList';
// @ts-ignore
import Login        from 'pages/Login';

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
    <Route path="/login" component={Login} />
  </React.Fragment>
);

export default hot(module)(App);
