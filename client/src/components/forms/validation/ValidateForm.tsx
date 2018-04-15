import * as React      from 'react';

import validationRules from 'utils/validationRules';

// @ts-ignore
export const ValidateFormContext = React.createContext();

interface ValidateFormProps {
}

class ValidateForm extends React.Component<ValidateFormProps> {
  state = {
    isValid: true,
  };
  inputs = [];

  registerComponent = (component) => {
    if (this.inputs.indexOf(component) === -1) {
      this.inputs.push(component);
    }

    this.validate(component);
  }

  unregisterComponent = (component) => {
    const componentIndex = this.inputs.indexOf(component);

    if (componentIndex !== -1) {
      this.inputs = [
        ...this.inputs.slice(0, componentIndex),
        ...this.inputs.slice(componentIndex + 1),
      ];
    }
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

    if (componentRules && componentRules.length) {
      componentRules.some(({ name, additionalValue }) => {
        const isValid = validationRules[name]([], component.state.value, additionalValue);
        const validationError = isValid ? null : validationErrors[name];

        validationResult.isValid = isValid;
        validationResult.validationError = validationError;

        // to break Array.some
        return !isValid;
      });
    }
    component.setState({ ...component.state, ...validationResult }, this.validateForm);

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
