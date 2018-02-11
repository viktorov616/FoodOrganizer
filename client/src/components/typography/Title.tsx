import * as React from 'react';

import { getClass } from 'utils/getClass';

interface TitleProps {
  text: string;
  modifiers?: string;
  size?: number|string;
}

const Title: React.SFC<TitleProps> = ({
  modifiers,
  size,
  text,
}) => {
  const Heading = `h${size}`;

  return (
    <Heading className={getClass('title', modifiers)}>
      <span className="title__text">{ text }</span>
    </Heading>
  );
};

Title.defaultProps = {
  modifiers: '',
  size: '1',
};

export default Title;
