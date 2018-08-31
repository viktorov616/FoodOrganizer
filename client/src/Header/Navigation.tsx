import * as React                   from 'react';
import * as cx                      from 'classnames';

import NavigationLink               from './NavigationLink';

import { NAVIGATION_LIST,
         UNLOGGED_NAVIGATION_LIST } from 'constants/navigation';
import { user }                     from 'stores/user';
import { getClass }                 from 'utils/getClass';

interface NavigationProps {
  user: user;
}

const Navigation: React.SFC<NavigationProps> = ({
  user,
}) => {
  const navigationList = user ? NAVIGATION_LIST : UNLOGGED_NAVIGATION_LIST;
  const navClassName = cx(
    'nav--horizontal',
    user ? 'g--5 nudge--left': 'g--3 m--7',
    { 'nav--justify-right': !user }
  )

  return (
    <nav className={navClassName}>
      <ul>
        { navigationList.map(item => (
          <NavigationLink
            key={item.path}
            { ...item }
          />
        )) }
      </ul>
    </nav>
  )
};

export default Navigation;
