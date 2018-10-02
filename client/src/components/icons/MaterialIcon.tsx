import * as React from 'react';

import * as cx    from 'classnames';

interface MaterialIconProps {
  ariaHidden?: boolean;
  baseClass?: string;
  icon: string;
  iconModifiers?: string;
}

const MaterialIcon: React.SFC<MaterialIconProps> = ({
  ariaHidden,
  baseClass,
  icon,
  iconModifiers,
}) => (
  <i
    aria-hidden={ariaHidden || undefined}
    className={cx('material-icons', baseClass, iconModifiers)}
  >
    { icon }
  </i>
);

MaterialIcon.defaultProps = {
  ariaHidden: true,
}

export default MaterialIcon;
