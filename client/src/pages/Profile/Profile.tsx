import * as React      from 'react';

import Container       from 'components/layout/Container';
import Title           from 'components/typography/Title';
// @ts-ignore
import Notifications   from 'components/notifications';
import ProfileViewMode from './ProfileViewMode';

import { userStore }   from 'stores/user';
import { inject,
         observer }    from 'mobx-react';

interface ProfileProps {
  userStore: userStore;
}

@inject('userStore')
@observer
class Profile extends React.Component<ProfileProps> {
  render() {
    const { userStore: { user } } = this.props;

    return (
      <Container>
        <Notifications />
        <Title
          text="Profile"
          icon="edit"
        />
        <ProfileViewMode {...user} />
      </Container>
    );
  }
}

export default Profile;
