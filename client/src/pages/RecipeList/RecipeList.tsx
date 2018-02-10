import * as React       from 'react';

import Container        from 'components/layout/Container';
import Title            from 'components/typography/Title';
import RecipeItem       from './RecipeItem';

import { inject,
         observer }     from 'mobx-react';
import { recipesStore } from 'stores/recipes';
import { toJS }         from 'mobx';

interface RecipeListProps {
  recipesStore?: recipesStore;
}

@inject('recipesStore')
@observer
class RecipeList extends React.Component<RecipeListProps> {
  componentDidMount() {
    const {
      recipesStore: {
        getRecipes,
        recipes,
      },
    } = this.props;

    getRecipes();
  }

  render() {
    const {
      recipesStore,
    } = this.props;
    console.log(toJS(recipesStore));
    return (
      <Container>
        <Title text="Recipe list" />
        { recipesStore.recipes.map(recipe => <RecipeItem key={recipe._id} recipe={recipe} />) }
      </Container>
    );
  }
}

export default RecipeList;
