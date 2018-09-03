import * as React     from 'react';

import LoginForm      from './LoginForm';
import Container      from 'components/layout/Container';
import Title          from 'components/typography/Title';
// @ts-ignore
import Notifications   from 'components/notifications';

interface LoginProps {

}

class Login extends React.Component<LoginProps> {
  render() {
    return (
      <Container>
        <Notifications />
        <Title text="Login" />
        <LoginForm />
      </Container>
    );
  }
}

export default Login;
