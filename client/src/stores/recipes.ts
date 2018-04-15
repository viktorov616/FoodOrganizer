import { addRecipe,
         getRecipe,
         getRecipes,
  // @ts-ignore
         updateRecipe }       from 'api';
import { action,
         observable,
         toJS,
         createTransformer,
         computed,
         runInAction,
         ObservableMap      } from 'mobx';
import notificationsStore     from './notifications';
import { clearEmptySteps,
         checkFilterParam }   from 'utils/recipeUtils';

export interface recipesStore {
  addRecipe: (data: recipeFromForm) => any;
  detailedRecipes: ObservableMap<recipeFromDb>;
  getRecipe: (slug: string) => any;
  getRecipes: () => any;
  isSendingRequest: boolean;
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
  @observable recipes = [];
  @observable detailedRecipes = new ObservableMap();
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
}

export default new RecipesStore();
