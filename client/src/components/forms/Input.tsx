import * as React   from 'react';

import { getClass } from 'utils/getClass';

export interface InputProps {
  id: string;
  label?: string;
  labelModifiers?: string;
  name: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
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
  };

  render() {
    const {
      children,
      id,
      label,
      labelModifiers,
      name,
      onChange,
      onKeyDown,
      onKeyUp,
      tagModifiers,
      type,
      value,
    } = this.props;

    return (
      <div className="input">
        <input
          className={getClass('input__tag', tagModifiers)}
          id={id}
          name={(name) ? name : null}
          onChange={(onChange) ? onChange : null}
          onKeyDown={(onKeyDown) ? onKeyDown : null}
          onKeyUp={(onKeyUp) ? onKeyUp : null}
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
