import * as React   from 'react';

interface DropdownLinkProps {
  link: string;
  text: string;
}

const DropdownLink: React.SFC<DropdownLinkProps> = ({
  link,
  text,
}) => (
  <li>
    <a href={link}>{ text }</a>
  </li>
);

export default DropdownLink;
