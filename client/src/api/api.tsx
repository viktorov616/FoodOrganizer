import axios from 'axios';

export const addRecipe = data => axios.post('/api/recipe', data);
export const getRecipes = data => axios('/api/recipes');
