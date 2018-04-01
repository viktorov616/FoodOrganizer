import * as React      from 'react';

import validationRules from 'utils/validationRules';

export const ValidateFormContext = React.createContext();

interface ValidateFormProps {
}

class ValidateForm extends React.Component<ValidateFormProps> {
  state = {
    isValid: true,
  };
  inputs = [];

  componentDidMount() {
    // console.log(this.inputs);
  }

  registerComponent = (component) => {
    // console.log(component);
    if (this.inputs.indexOf(component) === -1) {
      this.inputs.push(component);
    }
    // console.log(this.inputs.indexOf(component));
    // console.log(this.inputs[0] === component);
    console.log(this.inputs);
    // console.log({ key: 1} === { key: 1 });
  }

  unregisterComponent = (component) => {
    const componentIndex = this.inputs.indexOf(component);

    if (componentIndex !== -1) {
      this.inputs = [
        ...this.inputs.slice(0, componentIndex),
        ...this.inputs.slice(componentIndex + 1),
      ];
    }

    console.log(this.inputs);
  }

  validate = (component) => {
    const {
      validationRules: componentRules,
      validationErrors,
    } = component.props;
    const validationResult = {
      isValid: true,
      validationError: null,
    };

    if (componentRules.length) {
      componentRules.some(({ name, additionalValue }) => {
        const isValid = validationRules[name]([], component.state.value, additionalValue);
        const validationError = isValid ? null : validationErrors[name] || null;

        validationResult.isValid = isValid;
        validationResult.validationError = validationError;

        // to break Array.some
        return !isValid;
      });
    }
    console.log(validationResult);
    component.setState({ ...component.state, ...validationResult }, this.validateForm);
    console.log(this.state.isValid);
    return validationResult;
  }

  validateAll = () => {
    this.inputs.forEach((component) => {
      const validationResult = this.validate(component);
    });
  }

  validateForm = () => {
    const isInvalid = this.inputs.some(component => !component.state.isValid);

    this.setState({ isValid: !isInvalid });
  }

  contextPropsToPass = {
    registerComponent: this.registerComponent,
    unregisterComponent: this.unregisterComponent,
    validate: this.validate,
    validateAll: this.validateAll,
  };

  render() {
    const { children } = this.props;

    return (
      <ValidateFormContext.Provider value={this.contextPropsToPass}>
        <form { ...this.props }>
          { children }
        </form>
      </ValidateFormContext.Provider>
    );
  }
}

export default ValidateForm;
