import * as React       from 'react';
import * as cx          from 'classnames';

import BrandLogo        from './BrandLogo';
import Navigation       from './Navigation';
// @ts-ignore
import UserDropdown     from 'components/dropdowns/UserDropdown';

import { getTextColor } from 'utils/classNames';
import { userStore }    from 'stores/user';
import { inject,
         observer }     from 'mobx-react';

interface HeaderProps {
  userStore?: userStore;
}

@inject('userStore')
@observer
class Header extends React.Component<HeaderProps> {
  render() {
    const {
      userStore: { user },
    } = this.props;

    return (
      <header className="header container--baseline p020">
        <BrandLogo modifiers={cx('g--3', getTextColor('paper'))} />
        <Navigation user={user} />
        { user ? <UserDropdown /> : null }
      </header>
    );
  }
}

export default Header;
