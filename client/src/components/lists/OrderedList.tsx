import * as React   from 'react';

import { getClass } from 'utils/getClass';

interface OrderedListProps {
  modifiers?: string;
}

export const OrderedList: React.SFC<OrderedListProps> = ({
  children,
  modifiers,
}) => (
  <ol className={getClass('ordered-list', modifiers)}>
    { children }
  </ol>
);

interface OrderedListItemProps {
  modifiers?: string;
  num: number;
  text: string;
}

export const OrderedListItem: React.SFC<OrderedListItemProps> = ({
  modifiers,
  num,
  text,
}) => (
  <li className={getClass('ordered-list__item', modifiers)}>
    <span className="ordered-list__item-number">
      { num }
    </span>

    <span className="ordered-list__item-text">
      { text }
    </span>
  </li>
);
