import * as React          from 'react';

import Dropdown            from '../Dropdown';
import UserBlock           from './UserBlock';
import MaterialIcon        from 'components/icons/MaterialIcon';


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
      userStore: { user },
    } = this.props;

    console.log(toJS(user));

    return (
      <Dropdown className="user-dropdown">
        <UserBlock
          name={user.name}
          modifiers="inline"
        />

        <MaterialIcon
          baseClass="user-dropdown__dropdown-icon"
          icon="keyboard_arrow_down"
        />
      </Dropdown>
    )
  }
}

export default UserDropdown;
