import * as React   from 'react';

import { getClass } from 'utils/getClass';

interface InputProps {
  id: string;
  label?: string;
  labelModifiers?: string;
  name?: string;
  onChange?: () => void;
  type?: string;
}

class Input extends React.Component<InputProps> {
  static defaultProps = {
    labelModifiers: '',
    type: 'text',
  };

  render() {
    const { label, labelModifiers, type, id, onChange, name } = this.props;

    return (
      <div className="input">
        <input
          id={id}
          type={type}
          onChange={onChange}
          name={(name) ? name : null}
          className="input__tag"
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
