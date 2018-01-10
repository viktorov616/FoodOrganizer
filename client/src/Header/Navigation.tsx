import * as React          from 'react';

import BrandLogo           from './BrandLogo';
import NavigationLink      from './NavigationLink';

import { NAVIGATION_LIST } from 'constants/navigation';

const Navigation: React.SFC = () => (
  <nav className="light-blue">
    <div className="nav-wrapper">
      <BrandLogo />
      <ul>
        { NAVIGATION_LIST.map(item => (
          <NavigationLink
            key={item.path}
            { ...item }
          />
        )) }
      </ul>
    </div>
  </nav>
);

export default Navigation;
