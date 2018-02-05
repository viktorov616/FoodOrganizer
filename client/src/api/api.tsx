import axios from 'axios';

export function addRecipe(data) {
  axios.post('/api/add-recipe', data);
}
