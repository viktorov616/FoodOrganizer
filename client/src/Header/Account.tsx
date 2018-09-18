import * as React       from 'react';

import { Dropdown,
         DropdownItem,
         // @ts-ignore
         DropdownLink } from 'components/dropdownHover/Dropdown';
import { inject }       from 'mobx-react';
import { userStore }    from 'stores/user';

interface AccountProps {
  userStore?: userStore;
}

@inject('userStore')
class Account extends React.Component<AccountProps> {
  render() {
    const {
      userStore: { logout },
    } = this.props;

    return (
      <div className="m--2 g--2">
        <Dropdown text="Username">
          <DropdownLink
            link="/profile"
            text="Profile"
          />

          <DropdownItem
            text="Logout"
            onClick={logout}
          />
        </Dropdown>
      </div>
    );
  }
}

export default Account;
