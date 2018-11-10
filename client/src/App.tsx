import * as React       from 'react';

// @ts-ignore
import AddRecipe        from 'pages/AddRecipe/AddRecipe.tsx';
// @ts-ignore
import EditRecipe       from 'pages/EditRecipe';
// @ts-ignore
import Header           from './Header';
// @ts-ignore
import RandomRecipe     from 'pages/RandomRecipe';
// @ts-ignore
import Recipe           from 'pages/Recipe';
// @ts-ignore
import RecipeList       from 'pages/RecipeList';
// @ts-ignore
import Login            from 'pages/Login';
// @ts-ignore
import Register         from 'pages/Register';
// @ts-ignore
import PasswordReset    from 'pages/PasswordReset';
// @ts-ignore
import Profile          from 'pages/Profile';
import ConditionalRoute from 'components/PrivateRoute';
import Loader           from 'components/Loader';

import { Route,
         withRouter }   from 'react-router-dom';
import { hot }          from 'react-hot-loader';
import { inject,
         observer }     from 'mobx-react';
import { userStore }    from 'stores/user';

interface AppProps {
  userStore?: userStore;
}

@inject('userStore')
@observer
class App extends React.Component<AppProps> {
  componentDidMount = () => {
    const {
      userStore: { getUser },
    } = this.props;

    getUser();
  }

  render () {
    const {
      userStore: {
        user,
        userWasFetched,
      },
    } = this.props;

    if (!userWasFetched) return <Loader isActive/>;

    return (
      <React.Fragment>
        <Route path="/" component={Header} />

        <ConditionalRoute
          exact
          path="(/|/recipes)"
          component={RecipeList}
          condition={!!user}
          redirectTo="/login"
        />
        <ConditionalRoute
          exact
          path="/recipes/:slug"
          component={Recipe}
          condition={!!user}
          redirectTo="/login"
        />
        <ConditionalRoute
          path="/recipes/:slug/edit"
          component={EditRecipe}
          condition={!!user}
          redirectTo="/login"
        />
        <ConditionalRoute
          path="/random"
          component={RandomRecipe}
          condition={!!user}
          redirectTo="/login"
        />
        <ConditionalRoute
          path="/profile"
          component={Profile}
          condition={!!user}
          redirectTo="/login"
        />

        <ConditionalRoute
          path="/login"
          component={Login}
          condition={!user}
        />
        <ConditionalRoute
          path="/register"
          component={Register}
          condition={!user}
        />
        <ConditionalRoute
          path="/password_reset/:token?"
          component={PasswordReset}
          condition={!user}
        />
      </React.Fragment>
    );
  }
}

// @ts-ignore, don't know, why it's triggering error
export default hot(module)(withRouter(App));
