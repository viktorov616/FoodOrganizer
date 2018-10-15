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
        try {
          const values = this.inputs.map(input => input.state.value);
          const isValid = validationRules[name](values, component.state.value, additionalValue);
          const validationError = isValid ? null : validationErrors[name];

          validationResult.isValid = isValid;
          validationResult.validationError = validationError;

          // to break Array.some
          return !isValid;
        } catch (e) {
          console.error(
            e.message
            + `\nMaybe you misspeled validationRule, or forgot to add one with name ${name}?`,
          );
        }
      });
    }

    component.setState(
      validationResult,
      () => {
        this.validateForm();
        if (component.props.afterValidationCallback) {
          component.props.afterValidationCallback(name, validationResult.isValid);
        }
      },
    );

    return validationResult;
  }

  validateAll = () => {
    this.inputs.forEach((component) => {
      this.validate(component);
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
