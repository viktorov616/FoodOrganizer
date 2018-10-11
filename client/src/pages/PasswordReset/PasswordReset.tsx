import * as React              from 'react';

import PasswordResetForm       from 'pages/PasswordReset/PasswordResetForm';
import Container               from 'components/layout/Container';
import Title                   from 'components/typography/Title';
// @ts-ignore
import Notifications           from 'components/notifications';

import { match }               from 'react-router';
import { passwordResetParams } from 'interfaces/passwordResetParams';
import { observer,
         inject    }           from 'mobx-react';
// @ts-ignore
import { userStore }           from 'stores/user';

interface PasswordResetProps {
  match: match<passwordResetParams>;
  userStore?: userStore;
}

@inject('userStore')
@observer
class PasswordReset extends React.Component<PasswordResetProps> {
  componentDidMount() {
    const {
      match: { params: { token } },
      userStore: { validateToken },
    } = this.props;

    if (token) {
      validateToken({ token });
    }
  }

  render() {
    const { match: { params } } = this.props;

    console.log(params)

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
