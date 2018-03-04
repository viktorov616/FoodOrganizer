import * as React from 'react';

interface option {
  text: string;
  value: string;
}

interface SelectProps {
  defaultValue: string;
  id: string;
  label?: string;
  name?: string;
  onChange?: () => void;
  options: option[];
}

class Select extends React.Component<SelectProps> {
  render() {
    const { id, name, options, onChange, defaultValue, label } = this.props;

    return (
      <div className="select">
        <select
          name={name}
          id={id}
          onChange={onChange}
          defaultValue={defaultValue}
          className="select__tag"
        >
          { options.map(({ value, text }) => (
            <option
              key={value}
              value={value}
            >
              { text }
            </option>
          )) }
        </select>

        { (label)
          ? (<label htmlFor={id} className="select__label">
            { label }
          </label>)
          : null }
      </div>
    );
  }
}

export default Select;
