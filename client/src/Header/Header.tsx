import * as React        from 'react';

import BrandLogo         from './BrandLogo';
import Navigation        from './Navigation';
import * as cx           from 'classnames';

import { PRIMARY_COLOR } from 'constants/colorTheme';
import { getTextColor }  from 'utils/classNames';

const Header: React.SFC = () => (
  <header className="container--baseline p020">
    <BrandLogo modifiers={cx('g--3', getTextColor('paper'))} />
    <Navigation />
  </header>
);

export default Header;
