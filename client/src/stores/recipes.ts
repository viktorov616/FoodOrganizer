import { addRecipe,
         getRecipe,
         getRecipes,
         updateRecipe }     from 'api';
import { action,
         observable,
         toJS,
         createTransformer,
         runInAction,
         ObservableMap }    from 'mobx';
import notificationsStore   from './notifications';

export interface recipesStore {
  addRecipe: (data: recipeFromForm) => any;
  detailedRecipes: ObservableMap<recipeFromDb>;
  getRecipe: (slug: string) => any;
  getRecipes: () => any;
  isSendingRequest: boolean;
  recipes: recipeFromDb[];
  updateRecipe: (data: recipeFromForm, slug: string) => any;
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
  @observable detailedRecipes = new ObservableMap();

  @action.bound
  async addRecipe(data: recipeFromForm) {
    this.isSendingRequest = true;

    const response = await addRecipe(data);

    runInAction(() => {
      this.isSendingRequest = false;
      notificationsStore.handleErrors(response);
    });
  }

  @action.bound
  async getRecipe(slug) {
    this.isSendingRequest = true;
    const response = await getRecipe(slug);

    runInAction(() => {
      this.detailedRecipes.set(slug, response.data);
      this.isSendingRequest = false;
    });
  }

  @action.bound
  async getRecipes() {
    this.isSendingRequest = true;
    const response = await getRecipes();

    runInAction(() => {
      this.recipes = response.data;
      this.isSendingRequest = false;
    });
  }

  @action.bound
  async updateRecipe(data, slug) {
    this.isSendingRequest = true;

    const response = await updateRecipe(data, slug);

    runInAction(() => {
      this.isSendingRequest = false;
      notificationsStore.handleErrors(response);
    });
  }
}

export default new RecipesStore();
