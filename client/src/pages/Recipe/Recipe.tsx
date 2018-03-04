import * as React       from 'react';

import Container        from 'components/layout/Container';
import RecipeCard       from './RecipeCard';

import { inject,
         observer }     from 'mobx-react';
import { recipesStore } from 'stores/recipes';
import { toJS } from 'mobx'

interface RecipeProps {
  recipesStore?: recipesStore;
  match: any;
}

@inject('recipesStore')
@observer
class Recipe extends React.Component<RecipeProps> {
  componentDidMount() {
    const {
      match,
      recipesStore: {
        getRecipe,
      },
    } = this.props;

    getRecipe(match.params.slug);
  }

  render() {
    const {
      recipesStore: {
        detailedRecipes,
      },
      match: { params },
    } = this.props;
    console.log(toJS(detailedRecipes));
    const recipe = detailedRecipes.get(params.slug);
    console.log(recipe);

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
