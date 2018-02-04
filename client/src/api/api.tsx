import axios from 'axios';

export function addRecipe(data) {
  console.log('api', data);
  axios.post('/api/add-recipe', data);
}
