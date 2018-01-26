import * as React   from 'react';

import { getClass } from 'utils/getClass';

interface ButtonProps {
  icon?: string;
  modifiers?: string;
  text?: string;
}

const Button: React.SFC<ButtonProps> = ({ icon, modifiers, text }) => (
  <button className={getClass('btn', modifiers)}>
    <span className="btn__text">{ text }</span>

    { (icon)
      ? <i className="material-icons btn__icon">{ icon }</i>
      : null }
  </button>
);

Button.defaultProps = {
  icon: '',
  modifiers: 'raised',
  text: '',
};

export default Button;
