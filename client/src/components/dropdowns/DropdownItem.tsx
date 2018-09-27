import * as React from 'react';
import Button     from 'components/Button';

interface DropdownItemProps {
  href?: string;
  onClick?: () => void;
  text: string;
}

const DropdownItem: React.SFC<DropdownItemProps> = ({
  text,
  onClick,
  href,
}) => (
  href
    ? (<a
      className="btn btn--dropdown-item"
      href={href}
    >
      { text }
    </a>)
    : (<Button
      modifiers="dropdown-item"
      onClick={onClick}
      text={text}
    />)
);

export default DropdownItem;
