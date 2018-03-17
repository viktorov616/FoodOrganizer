import { recipeFromForm } from 'stores/recipes';

export function clearEmptySteps(data: recipeFromForm) {
  if (data.steps) {
    return { ...data, steps: data.steps.filter(step => step) };
  }

  return data;
}
