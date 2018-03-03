import * as React   from 'react';

import * as cx      from 'classnames';
import Loader       from 'components/Loader';

import { getClass } from 'utils/getClass';

interface ButtonProps {
  className?: string;
  icon?: string;
  iconModifiers?: string;
  isLoading?: boolean;
  modifiers?: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => any;
  text?: string;
  type?: string;
}

const Button: React.SFC<ButtonProps> = ({
  className,
  icon,
  iconModifiers,
  isLoading,
  modifiers,
  onClick,
  text,
  type,
}) => {
  function renderIcon() {
    return (
      (isLoading)
        ? (<Loader
          size="button"
          modifiers="inline white"
        />)
        : <i className={cx('material-icons btn__icon', iconModifiers)}>{ icon }</i>
    );
  }
  return (
    <button
      className={(className) ? className : getClass('btn', modifiers)}
      onClick={onClick}
      type={type}
    >
      { (text)
        ? <span className="btn__text">{ text }</span>
        : null }

      { (icon)
        ? renderIcon()
        : null }
    </button>
  );
};

Button.defaultProps = {
  icon: '',
  iconModifiers: '',
  isLoading: false,
  modifiers: 'raised',
  text: '',
  type: 'submit',
};

export default Button;
