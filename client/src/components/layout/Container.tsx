import * as React   from 'react';

import * as cx      from 'classnames';

import { getClass } from 'utils/getClass';

interface ContainerProps {
  flex?: boolean;
  flexModifiers?: string;
}

const Container: React.SFC<ContainerProps> = ({
  children,
  flex,
  flexModifiers,
}) => (
  <div className={cx('p020', { [getClass('container', flexModifiers)]: flex })}>
    { children }
  </div>
);

export default Container;
