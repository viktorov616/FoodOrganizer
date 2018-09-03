import * as React     from 'react';

import { Route,
         Redirect,
         RouteProps } from 'react-router';

interface ConditionalRouteProps extends RouteProps {
  condition: boolean;
  redirectTo?: string;
}

const ConditionalRoute: React.SFC<ConditionalRouteProps> = ({
  component: Component,
  condition,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      condition
        ? <Component { ...props } />
        : (<Redirect
          to={{
            pathname: redirectTo,
            state: { from: props.location },
          }}
        />)
    )}
  />
);

ConditionalRoute.defaultProps = {
  redirectTo: '/',
};

export default ConditionalRoute;
