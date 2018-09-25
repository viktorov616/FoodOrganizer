import * as React          from 'react';

import Dropdown            from '../Dropdown';
import UserBlock           from './UserBlock';
import UserDropdownItems   from './UserDropdownItems';

import { toJS }            from 'mobx'
import { inject }          from 'mobx-react';
import user, { userStore } from 'stores/user';

interface UserDropdownProps {
  userStore?: userStore;
}

@inject('userStore')
class UserDropdown extends React.Component<UserDropdownProps> {
  render() {
    const {
      userStore: {
        user,
        logout,
      },
    } = this.props;

    console.log(toJS(user));

    return (
      <Dropdown
        className="user-dropdown"
        items={<UserDropdownItems logout={logout} />}
      >
        <UserBlock
          name={user.name}
          modifiers="inline"
        />
      </Dropdown>
    )
  }
}

export default UserDropdown;
