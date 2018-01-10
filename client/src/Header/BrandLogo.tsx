import * as React  from 'react';

import { NavLink } from 'react-router-dom';

const BrandLogo: React.SFC = () => (
  <NavLink
    to="/"
    className="brand-logo center"
  >
    Food Organizer
  </NavLink>
);

export default BrandLogo;
