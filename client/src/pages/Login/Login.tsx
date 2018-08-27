import * as React     from 'react';

import LoginForm      from './LoginForm';
import Container      from 'components/layout/Container';
import Title          from 'components/typography/Title';

interface LoginProps {

}

class Login extends React.Component<LoginProps> {
  render() {
    return (
      <Container>
        <Title text="Login" />
        <LoginForm />
      </Container>
    );
  }
}

export default Login;
