import * as React from 'react';

import { user }   from 'stores/user';

const ProfileEditMode:React.SFC<user> = ({
  name,
  email,
}) => (
  <section>
    <p>{ name }</p>
    <p>{ email }</p>
  </section>
);

export default ProfileEditMode;
