import * as React   from 'react';

import { getClass } from 'utils/getClass';

export interface InputProps {
  autofocus?: boolean;
  id: string;
  label?: string;
  labelModifiers?: string;
  modifiers?: string;
  name: string;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.FormEvent<HTMLInputElement>) => void;
  tagModifiers?: string;
  type?: string;
  value?: string;
}

class Input extends React.Component<InputProps> {
  static defaultProps = {
    labelModifiers: '',
    type: 'text',
    modifiers: '',
  };

  render() {
    const {
      autofocus,
      children,
      id,
      label,
      labelModifiers,
      modifiers,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyUp,
      tagModifiers,
      type,
      value,
    } = this.props;

    return (
      <div className={getClass('input', tagModifiers)}>
        <input
          autoFocus={autofocus}
          className={getClass('input__tag', tagModifiers)}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          type={type}
          value={value}
        />

        { (label)
          ? (<label
            htmlFor={id}
            className={getClass('input__label', labelModifiers)}
          >
            { label }
          </label>)
          : null }
      </div>
    );
  }
}

export default Input;
