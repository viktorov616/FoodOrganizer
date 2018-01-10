import * as React  from 'react';

import * as cx     from 'classnames';

import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
  name: string;
  path: string;
}

const NavigationLink: React.SFC<NavigationLinkProps> = ({ name, path }) => (
  <li className={cx({ active: path === window.location.pathname })}>
    <NavLink
      exact
      to={path}
    >
      { name }
    </NavLink>
  </li>
);

export default NavigationLink;
