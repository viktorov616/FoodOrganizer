import { addRecipe,
         getRecipes } from 'api';
import { action,
         observable,
         toJS,
         createTransformer,
         runInAction } from 'mobx';
import notificationsStore     from './notifications';

export interface recipesStore {
  addRecipe: (data: recipeFromForm) => any;
  getRecipeBySlug: (slug: string) => any;
  getRecipes: () => any;
  isSendingRequest: boolean;
  recipes: recipeFromDb[];
}

interface recipeBase {
  description: string;
  ingredients: ingredient[];
  name: string;
  rating: number;
  slug?: string;
  tags: string[];
}

export interface ingredient {
  amount: string;
  name: string;
}

export interface recipeFromForm extends recipeBase {
  photo?: File;
}

export interface recipeFromDb extends recipeBase {
  _id: string;
  created: Date;
  photo?: string;
}

class RecipesStore<recipesStore>  {
  @observable isSendingRequest = false;
  @observable recipes = [];

  @action.bound
  async addRecipe(data) {
    this.isSendingRequest = true;

    const response = await addRecipe(data);

    runInAction(() => {
      this.isSendingRequest = false;
      notificationsStore.handleErrors(response);
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
    this.recipes.filter(recipe =>  recipe.slug === slug)[0]
  ));
}

export default new RecipesStore();
