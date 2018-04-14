import * as React              from 'react';

import ValidateOnBlur          from 'components/forms/validation/ValidateOnBlur';

import { ValidateFormContext } from 'components/forms/validation/ValidateForm';
import { getClass }            from 'utils/getClass';

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
  validationRules?: any;
  validationErrors?: any;
  isPristine?: boolean;
}

class Input extends React.Component<InputProps> {
  state = {
    focused: false,
  };

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

  handleBlur = (e) => {
    const {
      onFocus,
      onBlur,
    } = this.props;
    const focused = e.type === 'focus';
    console.log(e.type);

    this.setState({ focused });

    if (onFocus) onFocus(e);
    if (onBlur) onBlur(e);
  }

  renderInput = (props) => {
    // to avoid passing redundant props to input tag
    const {
      isPristine,
      renderProp,
      validationError,
      validationErrors,
      validationProps,
      validationRules,
      ...inputProps,
    } = props;
    const { focused } = this.state;
    console.log(focused);

    return (
      <React.Fragment>
        <input { ...inputProps } />

        { (!isPristine && !focused && validationError)
          ? <div className="input__validation-message">{ validationError }</div>
          : null }
      </React.Fragment>
    );
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
      onKeyDown,
      onKeyUp,
      tagModifiers,
      type,
      value,
      validationRules,
      validationErrors,
    } = this.props;

    return (
      <div className={getClass('input', modifiers)}>
        <ValidateFormContext.Consumer>
          { validationProps => (
            <ValidateOnBlur
              autoFocus={autofocus}
              className={getClass('input__tag', tagModifiers)}
              id={id}
              name={name}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onFocus={this.handleBlur}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              renderProp={this.renderInput}
              type={type}
              validationProps={validationProps}
              value={value}
              validationRules={validationRules}
              validationErrors={validationErrors}
            />
          ) }
        </ValidateFormContext.Consumer>

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
