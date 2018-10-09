import * as React   from 'react';

import MaterialIcon from 'components/icons/MaterialIcon';
import { getClass } from 'src/utils/getClass';

interface UserBLockProps {
  modifiers?: string;
  name: string;
}

const UserBLock:React.SFC<UserBLockProps> = ({
  modifiers,
  name,
}) => (
  <div className={getClass('user-block', modifiers)}>
    <p className="user-block__name">{ name }</p>

    <MaterialIcon
      baseClass="user-block__user-icon"
      icon="account_box"
    />
  </div>
);

export default UserBLock;
