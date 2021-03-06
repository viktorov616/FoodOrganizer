import * as React                   from 'react';
import * as cx                      from 'classnames';

import NavigationLink               from './NavigationLink';

import { NAVIGATION_LIST,
         UNLOGGED_NAVIGATION_LIST } from 'constants/navigation';
import { getClass }                 from 'utils/getClass';
import { user }                     from 'stores/user';

interface NavigationProps {
  user: user;
}

const Navigation: React.SFC<NavigationProps> = ({
  user,
}) => {
  const navigationList = user ? NAVIGATION_LIST : UNLOGGED_NAVIGATION_LIST;
  const navClassName = cx(
    getClass('nav', 'horizontal'),
    user ? 'g--5 nudge--left' : 'g--3 m--7',
    { 'nav--justify-right': !user },
  );

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
  );
};

export default Navigation;
