import * as React        from 'react';

import BrandLogo         from './BrandLogo';
import Navigation        from './Navigation';
import * as cx           from 'classnames';

import { getTextColor }  from 'utils/classNames';

const Header: React.SFC = () => (
  <header className="header container--baseline p020">
    <BrandLogo modifiers={cx('g--3', getTextColor('paper'))} />
    <Navigation />
  </header>
);

export default Header;
