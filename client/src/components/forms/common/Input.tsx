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
  onChange?: (name: string, value: string) => void;
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

  handleChange = (e) => {
    const {
      name,
      onChange,
    } = this.props;

    onChange(name, e.target.value);
  }

  render() {
    const {
      autofocus,
      id,
      label,
      labelModifiers,
      modifiers,
      name,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      tagModifiers,
      type,
      value,
    } = this.props;

    return (
      <div className={getClass('input', modifiers)}>
        <input
          autoFocus={autofocus}
          className={getClass('input__tag', tagModifiers)}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={this.handleChange}
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
