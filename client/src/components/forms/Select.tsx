import * as React from 'react';

interface option {
  text: string;
  value: string;
}

interface SelectProps {
  id: string;
  name?: string;
  onChange?: () => void;
  options: option[];
  defaultValue: string;
}

class Select extends React.Component<SelectProps> {
  render() {
    const { id, name, options, onChange, defaultValue } = this.props;

    return (
      <div className="input-field">
        <select
          name={name}
          id={id}
          onChange={onChange}
          defaultValue={defaultValue}
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
      </div>
    );
  }
}

export default Select;
