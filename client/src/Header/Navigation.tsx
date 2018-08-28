import * as React          from 'react';

import NavigationLink      from './NavigationLink';

import { NAVIGATION_LIST } from 'constants/navigation';

const Navigation: React.SFC = () => (
  <nav className="nav--horizontal g--5 nudge--left">
    <ul>
      { NAVIGATION_LIST.map(item => (
        <NavigationLink
          key={item.path}
          { ...item }
        />
      )) }
    </ul>
  </nav>
);

export default Navigation;
