import { addRecipe,
         getRecipes } from 'api';
import { action,
         observable,
         toJS,
         createTransformer,
         runInAction } from 'mobx';
import flahesStore     from './flashes';

export interface recipesStore {
  addRecipe: (data: recipe) => any;
  getRecipeBySlug: (slug: string) => any;
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

    const response = await addRecipe(data);

    runInAction(() => {
      this.isSendingRequest = false;
      flahesStore.handleErrors(response);
    });

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


  public getRecipeBySlug = createTransformer(slug => (
    this.recipes.filter(recipe =>  recipe.slug === slug)[0] || {}
  ));

  // getRecipeBySlug(slug) {
  //   return this.recipes.filter(recipe =>  recipe.slug === slug)[0];
  // }
}

export default new RecipesStore();
