import axios from 'axios';

import { getRecipeDataToSend } from 'utils/convertData';
import { recipeFromForm } from 'stores/recipes';

export function addRecipe(data: recipeFromForm) {
  const dataToSend = getRecipeDataToSend(data);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  return axios.post('/api/recipe', dataToSend, config).catch(e => e.response);
}

export function updateRecipe(data: recipeFromForm, slug: string) {
  const dataToSend = getRecipeDataToSend(data);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  console.log(data);

  return axios.post(`/api/recipe/${slug}`, dataToSend, config).catch(e => e.response);
}

export const getRecipe = (slug: string) => axios(`/api/recipe/${slug}`).catch(e => e.response);
export const getRecipes = () => axios('/api/recipes').catch(e => e.response);
