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
      ((entry[1] instanceof Object) && !(entry[1] instanceof File))
        ? JSON.stringify(entry[1]) : entry[1],
    )
  ));

  axios.post('/api/recipe', formData, config);
};

export const getRecipes = data => axios('/api/recipes');
