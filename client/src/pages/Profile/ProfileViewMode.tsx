import * as React from 'react';

import Button     from 'components/Button';

import { user }   from 'stores/user';

interface ProfileViewModeProps {
  passwordFormActive: boolean;
  togglePasswordForm: () => void;
  user: user;
}

const ProfileViewMode:React.SFC<ProfileViewModeProps> = ({
  passwordFormActive,
  togglePasswordForm,
  user: {
    name,
    email,
  },
}) => (
  <section>
    <p>Name: { name }</p>
    <p>Email: { email }</p>

    { !passwordFormActive
      ? (<Button
        onClick={togglePasswordForm}
        text="Change password"
      />)
      : null }
  </section>
);

export default ProfileViewMode;
