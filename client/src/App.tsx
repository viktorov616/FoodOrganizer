import * as React    from 'react';

// @ts-ignore
import AddRecipe     from 'pages/AddRecipe';
// @ts-ignore
import EditRecipe    from 'pages/EditRecipe';
// @ts-ignore
import Header        from './Header';
// @ts-ignore
import RandomRecipe  from 'pages/RandomRecipe';
// @ts-ignore
import Recipe        from 'pages/Recipe';
// @ts-ignore
import RecipeList    from 'pages/RecipeList';
// @ts-ignore
import Login         from 'pages/Login';
// @ts-ignore
import Register      from 'pages/Register';

import { Route }     from 'react-router-dom';
import { hot }       from 'react-hot-loader';
import { inject }    from 'mobx-react';
import { userStore } from 'stores/user';

interface AppProps {
  userStore?: userStore;
};

@inject('userStore')
class App extends React.Component<AppProps> {
  componentDidMount = () => {
    const {
      userStore: { getUser },
    } = this.props;

    getUser();
  }

  render () {
    const {
      userStore: { user }
    } = this.props;

    return (
      <React.Fragment>
        <Route path="/" component={Header} />

        { user
          ? (<React.Fragment>
            <Route exact path="(/|/recipes)" component={RecipeList} />
            <Route exact path="/recipes/:slug" component={Recipe} />
            <Route path="/recipes/:slug/edit" component={EditRecipe} />
            <Route path="/random" component={RandomRecipe} />
            <Route path="/add" component={AddRecipe} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </React.Fragment>)
          : (<React.Fragment>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </React.Fragment>) }
      </React.Fragment>
    )
  }
};

export default hot(module)(App);
