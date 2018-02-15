import { addRecipe,
         getRecipes } from 'api';
import { action,
         observable,
         toJS,
         runInAction } from 'mobx';

export interface recipesStore {
  addRecipe: (data: recipe) => any;
  getRecipes: () => any;
  isSendingRequest: boolean;
  recipes: recipe[];
}

export interface recipe {
  _id: string;
  created?: Date;
  description: string;
  ingredients: ingredient[];
  name: string;
  rating: number;
  slug?: string;
  tags: string[];
  photo?: File;
}

export interface ingredient {
  amount: string;
  name: string;
}

class RecipesStore<recipesStore>  {
  @observable isSendingRequest = true;
  @observable recipes = [];

  @action.bound
  async addRecipe(data) {
    this.isSendingRequest = true;
    await addRecipe(data);
    this.isSendingRequest = false;
  }

  @action.bound
  async getRecipes() {
    this.isSendingRequest = true;
    const answer = await getRecipes();

    runInAction(() => {
      this.recipes = answer.data;
      this.isSendingRequest = false;
    });
  }
}

export default new RecipesStore();
