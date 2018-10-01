import * as React   from 'react';

import MaterialIcon from 'components/icons/MaterialIcon';

import { getClass } from 'utils/getClass';

interface TitleProps {
  icon?: string;
  iconModifiers?: string;
  modifiers?: string;
  size?: number|string;
  text: string;
}

const Title: React.SFC<TitleProps> = ({
  icon,
  iconModifiers,
  modifiers,
  size,
  text,
}) => {
  const Heading = `h${size}`;

  return (
    <Heading className={getClass('title', modifiers)}>
      <span className="title__text">{ text }</span>

      { icon
        ? (<MaterialIcon
          baseClass="title__icon"
          icon={icon}
          iconModifiers={iconModifiers}
        />)
        : null }
    </Heading>
  );
};

Title.defaultProps = {
  modifiers: '',
  size: '1',
};

export default Title;
