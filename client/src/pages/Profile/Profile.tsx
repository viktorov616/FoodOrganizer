import * as React         from 'react';

import ChangePasswordForm from 'pages/PasswordReset/ChangePasswordForm';
import Container          from 'components/layout/Container';
import ProfilePageHeader  from './ProfilePageHeader';
// @ts-ignore
import Notifications      from 'components/notifications';
import ProfileViewMode    from './ProfileViewMode';
import ProfileEditMode    from './ProfileEditMode';

import { userStore }      from 'stores/user';
import { inject,
         observer }       from 'mobx-react';
import { action,
         observable }     from 'mobx';

interface ProfileProps {
  userStore: userStore;
}

interface ProfileState {
  editModeActive: boolean;
  passwordFormActive: boolean;
}

@inject('userStore')
@observer
class Profile extends React.Component<ProfileProps, ProfileState> {
  @observable editModeActive = false;
  @observable passwordFormActive = false;

  @action.bound
  toggleEditMode() {
    this.passwordFormActive = false;
    this.editModeActive = !this.editModeActive;
  }

  @action.bound
  togglePasswordForm() {
    this.passwordFormActive = !this.passwordFormActive;
  }

  render() {
    const { userStore: { user } } = this.props;

    return (
      <Container>
        <Notifications />
        <ProfilePageHeader
          toggleEditMode={this.toggleEditMode}
          editModeActive={this.editModeActive}
        />

        { this.editModeActive
          ? <ProfileEditMode toggleEditMode={this.toggleEditMode} />
          : (<ProfileViewMode
            passwordFormActive={this.passwordFormActive}
            togglePasswordForm={this.togglePasswordForm}
            user={user}
          />) }

        { this.passwordFormActive
          ? <ChangePasswordForm togglePasswordForm={this.togglePasswordForm} />
          : null }
      </Container>
    );
  }
}

export default Profile;
