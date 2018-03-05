import { recipeFromForm } from 'stores/recipes';

export function getRecipeDataToSend(data: recipeFromForm) {
  const dataToSend = new FormData();

  Object.entries(data).forEach((entry: [string, any]) => (
    dataToSend.append(
      entry[0],
      (!(entry[1] instanceof File)) ? JSON.stringify(entry[1]) : entry[1],
    )
  ));

  return dataToSend;
}
