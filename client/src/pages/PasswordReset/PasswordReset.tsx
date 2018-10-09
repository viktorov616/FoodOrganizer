import * as React        from 'react';

import PasswordResetForm from 'pages/PasswordReset/PasswordResetForm';
import Container         from 'components/layout/Container';
import Title             from 'components/typography/Title';
// @ts-ignore
import Notifications     from 'components/notifications';

interface PasswordResetProps {

}

class PasswordReset extends React.Component<PasswordResetProps> {
  render() {
    return (
      <Container>
        <Notifications />
        <Title text="Password reset" />
        <PasswordResetForm />
      </Container>
    );
  }
}

export default PasswordReset;
