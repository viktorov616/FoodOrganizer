import * as React          from 'react';

import Container           from 'components/layout/Container';
import BrandLogo           from './BrandLogo';
import NavigationLink      from './NavigationLink';

import { NAVIGATION_LIST } from 'constants/navigation';
import { PRIMARY_COLOR }   from 'constants/colorTheme';

const Navigation: React.SFC = () => (
  <nav className={PRIMARY_COLOR}>
    <Container>
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
    </Container>
  </nav>
);

export default Navigation;
