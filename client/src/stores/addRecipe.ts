import { addRecipe }  from 'api';
import { observable } from 'mobx';

const addRecipeStore = observable({
  isSendingRequest: false,

  addRecipe: async (data) => {
    this.isSendingRequest = true;
    console.log('data', data);
    await addRecipe(data);

    this.isSendingRequest = false;
  },
});

export default addRecipeStore;
