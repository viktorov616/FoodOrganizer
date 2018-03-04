import * as React       from 'react';

import Container        from 'components/layout/Container';
import RecipeCard       from './RecipeCard';
import Loader           from 'components/Loader';

import { inject,
         observer }     from 'mobx-react';
import { match }        from 'react-router';
import { recipeParams } from 'interfaces/recipeParams';
import { recipesStore } from 'stores/recipes';

interface RecipeProps {
  recipesStore?: recipesStore;
  match: match<recipeParams>;
}

@inject('recipesStore')
@observer
class Recipe extends React.Component<RecipeProps> {
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
        isSendingRequest,
      },
      match: { params },
    } = this.props;
    const recipe = detailedRecipes.get(params.slug);

    return (
      <Container>
        { (recipe)
          ? <RecipeCard { ...recipe } />
          : null }

        <Loader isActive={isSendingRequest} />
      </Container>
    );
  }
}

export default Recipe;
