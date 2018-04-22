const validationRules = {
  notEmpty: (values, value, additionalValue) => !!value,
  providedNotEmpty: (values, value, additionalValue) => !additionalValue.some(value => !value),
};

export default validationRules;
