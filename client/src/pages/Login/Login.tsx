import * as React     from 'react';

import * as cx        from 'classnames';
import LoginForm      from './LoginForm';
import Container      from 'components/layout/Container';
import Title          from 'components/typography/Title';

import { action,
         observable } from 'mobx';

interface AddRecepieProps {

}

class Login extends React.Component<AddRecepieProps> {
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
