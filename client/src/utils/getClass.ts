export function getClass(baseClass: string, modifiers: string | string[]) {
  if (!modifiers) return baseClass;

  const preparedModifiers: string[] = (typeof modifiers === 'string')
    ? modifiers.split(' ') : [...modifiers];

  const result: string = preparedModifiers.reduce(
    (accumulator, modifier) => `${accumulator} ${baseClass}--${modifier}`,
    baseClass,
  );

  return result;
}
