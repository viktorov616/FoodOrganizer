import * as React       from 'react';

import RecipeForm       from 'components/forms/RecipeForm';
import Container        from 'components/layout/Container';
// @ts-ignore
import Notifications    from 'components/notifications';
import Title            from 'components/typography/Title';

import { inject,
         observer }     from 'mobx-react';
import { match }        from 'react-router';
import { recipeParams } from 'interfaces/recipeParams';
import { recipesStore } from 'stores/recipes';

interface EditRecipeProps {
  recipesStore?: recipesStore;
  match: match<recipeParams>;
}

@inject('recipesStore')
@observer
class EditRecipe extends React.Component<EditRecipeProps> {
  componentDidMount() {
    const {
      match: { params },
      recipesStore: {
        detailedRecipes,
        getRecipe,
      },
    } = this.props;
    const recipe = detailedRecipes.get(params.slug);

    if (!recipe) getRecipe(params.slug);
  }

  render() {
    const {
      recipesStore: {
        detailedRecipes,
      },
      match: { params },
    } = this.props;
    const recipe = detailedRecipes.get(params.slug);

    return (
      <Container>
        <Notifications />
        <Title text="Edit recipe" />

        { (recipe)
          ? (<RecipeForm
            recipe={recipe}
            type="edit"
          />)
          : null }

        {/* <Loader isActive={isSendingRequest} /> */}
      </Container>
    );
  }
}

export default EditRecipe;
