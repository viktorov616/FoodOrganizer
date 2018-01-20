import * as React  from 'react';

import * as cx     from 'classnames';

import { NavLink } from 'react-router-dom';

interface BrandLogoProps {
  modifiers?: string;
}

const BrandLogo: React.SFC<BrandLogoProps> = ({ modifiers }) => (
  <NavLink
    to="/"
    className={cx('brand-logo', modifiers)}
  >
    Food Organizer
  </NavLink>
);

export default BrandLogo;
