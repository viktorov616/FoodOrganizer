import { addRecipe,
         getRecipe,
         getRecipes,
         updateRecipe,
         // @ts-ignore
         getRandomRecipe }      from 'api';
import { action,
         observable,
         toJS,
         computed,
         runInAction }       from 'mobx';
import { createTransformer } from 'mobx-utils';
import { clearEmptySteps,
         checkFilterParam }  from 'utils/recipeUtils';
import notificationsStore    from './notifications';

export interface recipesStore {
  addRecipe: (data: recipeFromForm) => any;
  detailedRecipes: Map<string, recipeFromDb>;
  getRandomRecipe: () => any;
  getRecipe: (slug: string) => any;
  getRecipes: () => any;
  isSendingRequest: boolean;
  randomRecipe: recipeFromDb;
  recipes: recipeFromDb[];
  updateFilter: (key: string, value: string[]) => any;
  updateRecipe: (data: recipeFromForm, slug: string) => any;
  filtredRecipes: recipeFromDb[];
  filter: filter;
}

interface filter {
  ingredient: string[];
  name: string[];
  tag: string[];
}

interface recipeBase {
  description: string;
  ingredients: ingredient[];
  name: string;
  rating: number;
  slug?: string;
  steps?: string[];
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
  @observable randomRecipe = null;
  @observable recipes = [];
  @observable detailedRecipes = observable.map();
  @observable filter = {
    ingredient: [],
    name: [],
    tag: [],
  };

  @action.bound
  async addRecipe(data: recipeFromForm) {
    const dataToSend = clearEmptySteps(data);

    this.isSendingRequest = true;

    const response = await addRecipe(dataToSend);

    runInAction(() => {
      this.isSendingRequest = false;
      notificationsStore.handleErrors(response);
    });
  }

  @computed
  get filtredRecipes() {
    return this.recipes.filter(recipe => (
      checkFilterParam(this.filter.name, recipe.name)
      && checkFilterParam(this.filter.tag, recipe.tags.join(''))
      && checkFilterParam(
        this.filter.ingredient,
        recipe.ingredients.reduce((result, { name }) => `${result}${name}`, ''),
      )
    ));
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
  updateFilter(key, value) {
    this.filter[key] = value;
  }

  @action.bound
  async updateRecipe(data, slug) {
    const dataToSend = clearEmptySteps(data);

    this.isSendingRequest = true;

    const response = await updateRecipe(dataToSend, slug);

    runInAction(() => {
      this.isSendingRequest = false;
      notificationsStore.handleErrors(response);
    });
  }

  @action.bound
  async getRandomRecipe() {
    this.isSendingRequest = true;

    const response = await getRandomRecipe(this.filter);

    runInAction(() => {
      this.isSendingRequest = false;
      console.log(response);
      this.randomRecipe = response.data;
      notificationsStore.handleErrors(response);
    });
  }
}

export default new RecipesStore();
