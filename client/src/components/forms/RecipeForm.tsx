import * as React          from 'react';

import Button              from 'components/Button';
import FileInput           from 'components/forms/common/FileInput';
import Input               from 'components/forms/common/Input';
import RatingPicker        from 'components/RatingPicker';
import Select              from 'components/forms/common/Select';
// @ts-ignore
import StepByStepFragment  from './StepByStepFragment';
import TagInput            from 'components/forms/common/TagInput';
import Textarea            from 'components/forms/common/Textarea';
import ValidateForm        from 'components/forms/validation/ValidateForm';

import { RATING_LIST }     from 'constants/general';
import { getClass }        from 'utils/getClass';
import { action,
         observable,
         toJS  }           from 'mobx';
import { observer,
         inject }          from 'mobx-react';
import { recipeFromForm,
         recipeFromDb,
         recipesStore,
         ingredient      } from 'stores/recipes';

interface RecipeFormProps {
  recipe?: recipeFromDb;
  recipesStore?: recipesStore;
  type?: string;
}

interface AddRecipeFormState {
  data: recipeFromForm;
}

@inject('recipesStore')
@observer
class RecipeForm extends React.Component<RecipeFormProps> {
  static defaultProps = {
    type: 'add',
  };

  @observable data = {
    description: this.getInitData('description'),
    ingredients: this.getInitData('ingredients'),
    name: this.getInitData('name'),
    rating: this.getInitData('rating'),
    steps: this.getInitData('steps'),
    tags: this.getInitData('tags'),
  };
  @observable stepByStepFormVisible = false;

  getInitData(name: string) {
    const defaultValues = {
      description: '',
      ingredients: [],
      name: '',
      rating: 0,
      steps: [],
      tags: [],
    };

    return (this.props.recipe) ? this.props.recipe[name] : defaultValues[name];
  }

  getTagsValue(name: string) {
    switch (name) {
      case 'ingredients':
        return this.data.ingredients.map(ingredient => ({
          ...ingredient,
          _text: Object.entries(ingredient)
            .filter(([key]) => key !== '_id')
            .map(([key, value]) => value)
            .join(' '),
        }));
      case 'tags':
      default:
        return this.data.tags.map((tag, i) => ({
          tag,
          _id: i,
          _text: tag,
        }));
    }
  }

  handleSubmit = (e) => {
    const {
      recipesStore: {
        addRecipe,
        updateRecipe,
      },
      type,
      recipe,
    } = this.props;

    e.preventDefault();

    (type === 'add') ? addRecipe(this.data) : updateRecipe(this.data, recipe.slug);
  }

  @action.bound
  handleFormDataChange(name: string, value: string|number|File|{ [key: string]: string }[]) {
    // specific handling requires, because TagInput returns an array of objects for each input
    if (name === 'tags' && value instanceof Array) {
      this.data[name] = value.map(item => item.tag);
    } else if (name === 'ingredients' && value instanceof Array) {
      // replace keys for objects from 'ingredients[key]' to '[key]'
      // ingredients[key] - this format used, because key can duplicate name with real inputs
      this.data[name] = value.map((item) => {
        const itemKeys = Object.keys(item);

        return itemKeys.reduce(
          (result, key) => ({ ...result, [key.match(/ingredients\[(.*)\]/)[1]]: item[key] }),
          {});
      });
    } else {
      this.data[name] = value;
    }
  }

  @action
  showStepByStepForm = () => {
    this.stepByStepFormVisible = true;
  }

  render() {
    const {
      recipe,
      recipesStore: { isSendingRequest },
      type,
    } = this.props;

    return (
      <div className="g--6">
        <ValidateForm>
        {/* <form onSubmit={this.handleSubmit}> */}
          <Input
            autofocus
            id="name"
            label="Name"
            name="name"
            onChange={this.handleFormDataChange}
            value={this.data.name}
            validationRules={[
              { name: 'notEmpty' },
            ]}
            validationErrors={{
              notEmpty: 'This field shoud be filed up',
            }}
          />

          <TagInput
            btn="Add ingredient"
            label="Ingredients"
            name="ingredients"
            inputs={[{
              id: 'ingredients[name]',
              label: 'Name',
              name: 'ingredients[name]',
            }, {
              id: 'ingredients[amount]',
              label: 'Amount',
              name: 'ingredients[amount]',
            }]}
            onTagsUpdate={this.handleFormDataChange}
            tags={this.getTagsValue('ingredients')}
          />

          <TagInput
            btn="Add tag"
            label="Tags"
            name="tags"
            inputs={[{
              id: 'tag',
              name: 'tag',
            }]}
            onTagsUpdate={this.handleFormDataChange}
            tags={this.getTagsValue('tags')}
          />

          <Textarea
            id="description"
            name="description"
            label="Description"
            onChange={this.handleFormDataChange}
            value={this.data.description}
          />

          <RatingPicker
            ratingList={RATING_LIST}
            label="Rating"
            onChange={this.handleFormDataChange}
            value={this.data.rating}
          />

          <FileInput
            id="photo"
            label="Photo"
            name="photo"
            onChange={this.handleFormDataChange}
            photoToDisplay={(recipe) ? recipe.photo : null}
            text={(type === 'edit' && recipe.photo) ? 'Upload new' : 'Click to upload'}
          />

          { (this.stepByStepFormVisible)
            ? <StepByStepFragment onStepsChange={this.handleFormDataChange} />
            : (<Button
              icon="format_list_numbered"
              onClick={this.showStepByStepForm}
              text="Add step by step guide"
              modifiers="raised single"
              type="button"
            />) }

          <Button
            icon="send"
            isLoading={isSendingRequest}
            onClick={this.handleSubmit}
            text={(type === 'add') ? 'Submit' : 'Save'}
          />
        {/* </form> */}
        </ValidateForm>
      </div>
    );
  }
}

export default RecipeForm;
