import * as React from 'react';

import * as cx    from 'classnames';

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
    <Heading className={cx('title', modifiers)}>
      <span className="title__text">{ text }</span>
    </Heading>
  );
};

Title.defaultProps = {
  modifiers: '',
  size: '1',
};

export default Title;
