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

    return (
      <Container>
        { (recipe)
          ? <RecipeCard { ...recipe } />
          : null }
      </Container>
    );
  }
}

export default Recipe;
