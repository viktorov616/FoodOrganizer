import * as React from 'react';
import Button     from 'components/Button';

interface DropdownItemProps {
  text: string;
  onClick: () => any;
}

const DropdownItem: React.SFC<DropdownItemProps> = ({
  text,
  onClick,
}) => (
  <li>
    <Button
      modifiers="dropdown-item"
      onClick={onClick}
      text={text}
    />
  </li>
)

export default DropdownItem;
