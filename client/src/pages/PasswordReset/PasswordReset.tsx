import * as React              from 'react';

import PasswordResetForm       from 'pages/PasswordReset/PasswordResetForm';
import SendTokenForm           from 'pages/PasswordReset/SendTokenForm';
import Container               from 'components/layout/Container';
import Title                   from 'components/typography/Title';
import Loader                  from 'components/Loader';
// @ts-ignore
import Notifications           from 'components/notifications';

import { match }               from 'react-router';
import { passwordResetParams } from 'interfaces/passwordResetParams';
import { observer,
         inject    }           from 'mobx-react';
// @ts-ignore
import { userStore }           from 'stores/user';
import { observable, action, runInAction }          from 'mobx';

interface PasswordResetProps {
  match: match<passwordResetParams>;
  userStore?: userStore;
}

@inject('userStore')
@observer
class PasswordReset extends React.Component<PasswordResetProps> {
  @observable tokenConfirmed = false;

  async componentDidMount() {
    const {
      match: { params: { token } },
      userStore: { validateToken },
    } = this.props;

    if (token) this.handleValidateToken();
  }

  @action.bound
  async handleValidateToken() {
    const {
      match: { params: { token } },
      userStore: { validateToken },
    } = this.props;
    const response = await validateToken({ token });
    // const response = { tokenConfirmed: true }
    // console.log(response)
    runInAction(() => {
      console.log(response)
      this.tokenConfirmed = response.tokenConfirmed
    })

  }

  render() {
    const {
      match: { params: { token } },
      userStore: { isSendingRequest },
    } = this.props;

    console.log(this.tokenConfirmed);

    return (
      <Container>
        <Notifications />
        <Title text="Password reset" />
        <Loader isActive={isSendingRequest} />

        { !token ? <SendTokenForm /> : null }
        { (token && this.tokenConfirmed) ? <PasswordResetForm token={token} /> : null }
      </Container>
    );
  }
}

export default PasswordReset;
