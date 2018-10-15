import * as React from 'react';

import Button     from 'components/Button';

import { user }   from 'stores/user';

interface ProfileViewModeProps {
  email: user['email'], // wish I could use destrucuring
  name: user['name'],
  showChangePasswordForm: () => void,
}

const ProfileViewMode:React.SFC<ProfileViewModeProps> = ({
  name,
  email,
  showChangePasswordForm,
}) => (
  <section>
    <p>Name: { name }</p>
    <p>Email: { email }</p>

    <Button
      onClick={showChangePasswordForm}
      text="Change password"
    />
  </section>
);

export default ProfileViewMode;
