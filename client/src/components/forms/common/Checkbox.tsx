import * as React   from 'react';
import * as cx      from 'classnames';

import MaterialIcon from 'components/icons/MaterialIcon';

import { getClass } from 'utils/getClass';

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  id: string;
  modifiers?: string;
  onChange: () => void;
  text?: string;
}

const Checkbox: React.SFC<CheckboxProps> = ({
  checked,
  disabled,
  id,
  modifiers,
  onChange,
  text,
}) => (
  <label
    className={getClass('checkbox', cx(modifiers, { disabled }))}
    htmlFor={id}
  >
    <input
      checked={checked}
      className="checkbox__input"
      disabled={disabled}
      id={id}
      onChange={onChange}
      type="checkbox"
    />

    <div className="checkbox__icon">
      <MaterialIcon
        baseClass="checkbox__icon-done"
        icon="done"
        iconModifiers="md-16"
      />
    </div>

    { text
      ? <div className="checkbox__text">{ text }</div>
      : null }
  </label>

);

export default Checkbox;
