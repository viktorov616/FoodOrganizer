import axios from 'axios';
import * as qs from 'query-string';

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

  return axios.post(`/api/recipe/${slug}`, dataToSend, config).catch(e => e.response);
}

export const getRecipe = (slug: string) => axios(`/api/recipe/${slug}`).catch(e => e.response);
export const getRecipes = () => axios('/api/recipes').catch(e => e.response);
export const getRandomRecipe = filter => (
  axios(`/api/random/${qs.stringify(filter)}`)
).catch(e => e.response);

export const register = data => axios.post('/api/register', data).catch(e => e.response);
export const login = data => axios.post('/api/login', data).catch(e => e.response);
export const logout = () => axios.post('/api/logout').catch(e => e.response);
export const getUser = () => axios('/api/user').catch(e => e.response);
export const updateAccount = data => axios.post('/api/updateAccount', data).catch(e => e.response);
