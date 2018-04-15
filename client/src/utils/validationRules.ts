const validationRules = {
  notEmpty: (values, value, additionalParam) => !!value,
  allNotEmpty: (values, value, additionalParam) => !values.some(value => !!value),
};

export default validationRules;
