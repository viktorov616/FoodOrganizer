import * as React from 'react';

interface InputProps {
  id: string;
  label?: string;
  labelClassName?: string;
  name?: string;
  onChange?: () => void;
  type?: string;
}

class Input extends React.Component<InputProps> {
  static defaultProps = {
    label: '',
    labelClassName: 'active',
    type: 'text',
  };

  render() {
    const { label, labelClassName, type, id, onChange, name } = this.props;
    return (
      <div className="input-field">
        <input
          id={id}
          type={type}
          onChange={onChange}
          name={(name) ? name : null}
        />

        { (label)
          ? (<label
            htmlFor={id}
            className={labelClassName}
          >
            { label }
          </label>)
          : null }
      </div>
    );
  }
}

export default Input;
