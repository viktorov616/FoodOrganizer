const validationRules = {
  notEmpty: (values, value, additionalParam) => (console.log(value), !!value),
};

export default validationRules;
