import * as React              from 'react';

import { InputProps }          from 'components/forms/common/Input';
import { ValidateFormContext } from './ValidateForm';

interface ValidateOnBlurProps extends InputProps {
  autoFocus?: boolean;
  className?: string;
  renderProp: (props: any) => JSX.Element;
  validationProps: any;
}

class ValidateOnBlur extends React.Component<ValidateOnBlurProps> {
  state = {
    isValid: true,
    value: this.props.value,
  };

  componentDidMount() {
    this.props.validationProps.registerComponent(this);
  }

  componentWillMount() {
    this.props.validationProps.unregisterComponent(this);
  }

  handleChange = (e) => {
    const { onChange } = this.props;

    this.setState({ value: e.target.value });

    if (onChange) onChange(e);
  }

  handleBlur = (e) => {
    const {
      onBlur,
      validationProps,
    } = this.props;
    validationProps.validate(this);

    if (onBlur) onBlur(e);
  }

  render() {
    const { renderProp } = this.props;
    // console.log(this.props.validationProps);

    return (
      renderProp({
        ...this.props,
        onBlur: this.handleBlur,
        onFocus: this.handleBlur,
        onChange: this.handleChange,
      })
    );
  }
}

export default ValidateOnBlur;
