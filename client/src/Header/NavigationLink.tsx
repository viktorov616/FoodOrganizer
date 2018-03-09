import * as React    from 'react';

import * as cx       from 'classnames';

import { NavLink }   from 'react-router-dom';
import { HOME_PAGE } from 'constants/navigation';

interface NavigationLinkProps {
  name: string;
  path: string;
}

const NavigationLink: React.SFC<NavigationLinkProps> = ({ name, path }) => {
  function isActive(match, location) {
    return path === location.pathname || (location.pathname === '/' && HOME_PAGE === name);
  }

  return (
    <li className={cx({ active: path === window.location.pathname || HOME_PAGE === name })}>
      <NavLink
        exact
        to={path}
        className="btn--flat"
        isActive={isActive}
      >
        { name }
      </NavLink>
    </li>
  );
};

export default NavigationLink;
