import * as React from 'react';

import * as cx    from 'classnames';

interface MaterialIconProps {
  baseClass?: string;
  icon: string;
  iconModifiers?: string;
}

const MaterialIcon: React.SFC<MaterialIconProps> = ({
  baseClass,
  icon,
  iconModifiers,
}) => (
  <i
    aria-hidden="true"
    className={cx('material-icons', baseClass, iconModifiers)}
  >
    { icon }
  </i>
);

export default MaterialIcon;
