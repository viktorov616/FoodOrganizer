import * as React    from 'react';

import RegisterForm  from './RegisterForm';
import Container     from 'components/layout/Container';
import Title         from 'components/typography/Title';
// @ts-ignore
import Notifications from 'components/notifications';

interface RegisterProps {

}

class Register extends React.Component<RegisterProps> {
  render() {
    return (
      <Container>
        <Notifications />
        <Title text="Register" />
        <RegisterForm />
      </Container>
    );
  }
}

export default Register;
