import { recipeFromForm } from 'stores/recipes';

export function clearEmptySteps(data: recipeFromForm) {
  if (data.steps) {
    return { ...data, steps: data.steps.filter(step => step) };
  }

  return data;
}

export function checkFilterParam(filterParams: string[], strToTest: string) {
  return (
    !filterParams.length || filterParams.some(item => new RegExp(item, 'i').test(strToTest))
  );
}
