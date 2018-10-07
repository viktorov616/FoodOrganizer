import * as React        from 'react';

import Container         from 'components/layout/Container';
import ProfilePageHeader from './ProfilePageHeader';
// @ts-ignore
import Notifications     from 'components/notifications';
import ProfileViewMode   from './ProfileViewMode';
import ProfileEditMode   from './ProfileEditMode';

import { userStore }     from 'stores/user';
import { inject,
         observer }      from 'mobx-react';
import { action,
         observable }    from 'mobx';

interface ProfileProps {
  userStore: userStore;
}

@inject('userStore')
@observer
class Profile extends React.Component<ProfileProps> {
  @observable editModeActive = false;

  @action.bound
  toggleEditMode() {
    this.editModeActive = !this.editModeActive;
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
          : <ProfileViewMode {...user} /> }
      </Container>
    );
  }
}

export default Profile;
