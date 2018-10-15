import * as isEmail from 'validator/lib/isEmail';

const validationRules = {
  notEmpty: (values, value, additionalValue) => !!value,
  providedNotEmpty: (values, value, additionalValue) => !additionalValue.some(value => !value),
  isEmail: (values, value, additionalValue) => isEmail(value),
  same: (values, value, additionalValue) => value === additionalValue,
};

export default validationRules;
