import * as React       from 'react';

import Container        from 'components/layout/Container';
import RecipeCard       from './RecipeCard';

import { inject,
         observer }     from 'mobx-react';
import { recipesStore } from 'stores/recipes';

interface RecipeProps {
  recipesStore?: recipesStore;
  match: any;
}

@inject('recipesStore')
@observer
class Recipe extends React.Component<RecipeProps> {
  componentDidMount() {
    const {
      recipesStore: {
        getRecipes,
      },
    } = this.props;

    getRecipes();
  }

  render() {
    const {
      recipesStore: { getRecipeBySlug, recipes },
      match: { params },
    } = this.props;
    const recipe = getRecipeBySlug(params.slug);
    console.log(recipe, recipes);

    return (
      <Container>
        <RecipeCard
          { ...recipe }
        />
      </Container>
    );
  }
}

export default Recipe;
