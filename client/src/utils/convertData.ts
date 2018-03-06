import { recipeFromForm } from 'stores/recipes';

export function getRecipeDataToSend(data: recipeFromForm) {
  const dataToSend = new FormData();

  Object.entries(data).forEach(([key, value]: [string, any]) => (
    dataToSend.append(
      key,
      (!(value instanceof File)) ? JSON.stringify(value) : value,
    )
  ));

  return dataToSend;
}
