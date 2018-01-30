import * as React   from 'react';

import { getClass } from 'utils/getClass';

export interface InputProps {
  id: string;
  label?: string;
  labelModifiers?: string;
  modifiers?: string;
  name: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.FormEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
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
      children,
      id,
      label,
      labelModifiers,
      modifiers,
      name,
      onChange,
      onKeyDown,
      onKeyUp,
      onFocus,
      onBlur,
      tagModifiers,
      type,
      value,
    } = this.props;

    return (
      <div className={getClass('input', tagModifiers)}>
        <input
          className={getClass('input__tag', tagModifiers)}
          id={id}
          name={name}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          onBlur={onBlur}
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
