import * as React       from 'react';
import * as cx          from 'classnames';

import BrandLogo        from './BrandLogo';
import Navigation       from './Navigation';
import Account          from './Account';

import { getTextColor } from 'utils/classNames';
import { userStore }    from 'stores/user';
import { inject }       from 'mobx-react';

interface HeaderProps {
  userStore?: userStore;
}

const Header: React.SFC<HeaderProps> = inject('userStore')(({
  userStore: { user }
}) => (
  <header className="header container--baseline p020">
    <BrandLogo modifiers={cx('g--3', getTextColor('paper'))} />
    <Navigation user={user} />
    { user ? <Account /> : null }
  </header>
));

export default Header;
