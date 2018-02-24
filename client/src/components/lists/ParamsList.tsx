import * as React   from 'react';

import * as cx      from 'classnames';

import { getClass } from 'utils/getClass';

interface ParamsListItemProps {
  itemKey: string|number;
  keyModifiers?: string;
  modifiers?: string;
  value: string|number;
  valueModifiers?: string;
  width?: {
    key: number;
    value: number;
  };
}

export const ParamsList: React.SFC = ({
  children,
}) => (
  <ul className="params-list">
    { children }
  </ul>
);

export const ParamsListItem: React.SFC<ParamsListItemProps> = ({
  children,
  itemKey,
  keyModifiers,
  modifiers,
  value,
  valueModifiers,
  width,
}) => (
  <li className={getClass('params-list__item', modifiers)}>
    { (itemKey)
      ? (<span
        className={getClass('params-list__item-key', keyModifiers)}
        style={{ width: (width) ? `${width.key}%` : '' }}
      >
        { itemKey }
      </span>)
      : null }

    <span
      className={getClass('params-list__item-value', cx(valueModifiers, { full: !itemKey }))}
      style={{ width: (width) ? `${width.value}%` : '' }}
    >
      { value }
    </span>

    { children }
  </li>
);
