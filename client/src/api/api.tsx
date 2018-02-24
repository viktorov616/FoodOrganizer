import axios from 'axios';

export const addRecipe = (data) => {
  const formData = new FormData();
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  Object.entries(data).forEach((entry: [string, any]) => (
    formData.append(
      entry[0],
      (!(entry[1] instanceof File)) ? JSON.stringify(entry[1]) : entry[1],
    )
  ));

  return axios.post('/api/recipe', formData, config).catch(e => e.response);
};

export const getRecipes = data => axios('/api/recipes').catch(e => e.response);
