import * as React   from 'react';

import Loader       from 'components/Loader';
import MaterialIcon from 'components/icons/MaterialIcon';

import { getClass } from 'utils/getClass';

interface ButtonProps {
  ariaExpanded?: boolean;
  ariaHaspopup?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: string;
  iconAriaHidden?: boolean;
  iconModifiers?: string;
  isLoading?: boolean;
  modifiers?: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.FormEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.FormEvent<HTMLButtonElement>) => void;
  role?: string;
  text?: string|JSX.Element|React.ReactNode;
  type?: string;
}

const Button: React.SFC<ButtonProps> = ({
  ariaExpanded,
  ariaHaspopup,
  className,
  disabled,
  icon,
  iconAriaHidden,
  iconModifiers,
  isLoading,
  modifiers,
  onClick,
  onMouseEnter,
  onMouseLeave,
  role,
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
          ariaHidden={iconAriaHidden}
          baseClass="btn__icon"
          icon={icon}
          iconModifiers={iconModifiers}
        />)
    );
  }
  return (
    <button
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      className={(className) ? className : getClass('btn', modifiers)}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role={role}
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
