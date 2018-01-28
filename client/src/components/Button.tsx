import * as React   from 'react';

import * as cx      from 'classnames';

import { getClass } from 'utils/getClass';

interface ButtonProps {
  className?: string;
  icon?: string;
  iconModifiers?: string;
  modifiers?: string;
  onClick: () => any;
  text?: string;
}

const Button: React.SFC<ButtonProps> = ({
  className,
  icon,
  iconModifiers,
  modifiers,
  onClick,
  text,
}) => (
  <button
    className={(className) ? className : getClass('btn', modifiers)}
    onClick={onClick}
  >
    { (text)
      ? <span className="btn__text">{ text }</span>
      : null }

    { (icon)
      ? <i className={cx('material-icons btn__icon', iconModifiers)}>{ icon }</i>
      : null }
  </button>
);

Button.defaultProps = {
  icon: '',
  iconModifiers: '',
  modifiers: 'raised',
  text: '',
};

export default Button;
