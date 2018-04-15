import * as React              from 'react';

import { InputProps }          from 'components/forms/common/Input';

interface ValidateOnBlurProps extends InputProps {
  autoFocus?: boolean;
  className?: string;
  renderProp: (props: any) => JSX.Element;
  validationProps: any;
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
    this.props.validationProps.registerComponent(this);
  }

  componentWillUnmount() {
    this.props.validationProps.unregisterComponent(this);
  }

  handleChange = (e) => {
    const {
      onChange,
      name,
    } = this.props;

    this.setState({ value: e.target.value });

    if (onChange) onChange(name, e.target.value);
  }

  handleBlur = (e) => {
    const {
      onBlur,
      validationProps,
    } = this.props;
    this.setState(
      { isPristine: false },
      () => validationProps.validate(this),
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
