import * as React   from 'react';

import DropdownItem from 'components/dropdowns/DropdownItem';

interface UserDropdownItemsProps {
  logout: () => void;
}

const UserDropdownItems :React.SFC<UserDropdownItemsProps> = ({
  logout,
}) => (
  <React.Fragment>
    <DropdownItem
      href="/profile"
      text="Profile"
    />

    <DropdownItem
      text="Logout"
      onClick={logout}
    />
  </React.Fragment>
);

export default UserDropdownItems;
