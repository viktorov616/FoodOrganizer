import * as React              from 'react';

import { InputProps }          from 'components/forms/common/Input';

interface ValidateOnBlurProps {
  autoFocus?: boolean;
  className?: string;
  id: string;
  isPristine?: boolean;
  label?: string;
  labelModifiers?: string;
  modifiers?: string;
  name: string;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (e: React.FormEvent<HTMLInputElement>|React.FormEvent<HTMLTextAreaElement>) => any;
  onFocus?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.FormEvent<HTMLInputElement>) => void;
  renderProp: (props: any) => JSX.Element;
  tagModifiers?: string;
  type?: string;
  validationErrors?: any;
  validationProps: any;
  validationRules?: any;
  value?: string;
}

interface ValidateOnBlurState {
  isPristine: boolean;
  isValid: boolean;
  validationError: string;
  value: string;
}

class ValidateOnBlur extends React.Component<ValidateOnBlurProps, ValidateOnBlurState> {
  state = {
    isPristine: true,
    isValid: true,
    validationError: null,
    value: this.props.value,
  };

  componentDidMount() {
    const { validationProps } = this.props;

    if (validationProps) validationProps.registerComponent(this);
  }

  componentWillUnmount() {
    const { validationProps } = this.props;

    if (validationProps) this.props.validationProps.unregisterComponent(this);
  }

  handleChange = (e) => {
    const {
      onChange,
      name,
    } = this.props;

    this.setState({ value: e.target.value });

    if (onChange) onChange(e);
  }

  handleBlur = (e) => {
    const {
      onBlur,
      validationProps,
    } = this.props;
    this.setState(
      { isPristine: false },
      () => validationProps && validationProps.validate(this),
    );

    if (onBlur) onBlur(e);
  }

  render() {
    const {
      isPristine,
      validationError,
    } = this.state;
    const { renderProp } = this.props;

    return (
      renderProp({
        ...this.props,
        isPristine,
        validationError,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onFocus: this.handleBlur,
      })
    );
  }
}

export default ValidateOnBlur;
