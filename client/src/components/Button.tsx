import * as React   from 'react';

import Loader       from 'components/Loader';
import MaterialIcon from 'components/icons/MaterialIcon';

import { getClass } from 'utils/getClass';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  icon?: string;
  iconModifiers?: string;
  isLoading?: boolean;
  modifiers?: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => any;
  text?: string|JSX.Element;
  type?: string;
}

const Button: React.SFC<ButtonProps> = ({
  className,
  disabled,
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
          isActive
          size="button"
          modifiers="inline white"
        />)
        : (<MaterialIcon
          baseClass="btn__icon"
          icon={icon}
          iconModifiers={iconModifiers}
        />)
    );
  }
  return (
    <button
      className={(className) ? className : getClass('btn', modifiers)}
      disabled={disabled}
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
