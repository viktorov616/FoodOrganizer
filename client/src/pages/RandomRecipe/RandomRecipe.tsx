import * as React         from 'react';

import Button             from 'components/Button';
import Container          from 'components/layout/Container';
import RandomRecipeFilter from './RandomRecipeFilter';
import Title              from 'components/typography/Title';
// @ts-ignore
import RecipeItem         from 'pages/RecipeList/RecipeItem';

import { inject,
         observer }       from 'mobx-react';
import { recipesStore }   from 'stores/recipes';
import { action,
         observable }     from 'mobx';

interface RecipeListProps {
  recipesStore: recipesStore;
}

@inject('recipesStore')
@observer
class RecipeList extends React.Component<RecipeListProps> {
  @observable filterIsActive = false;

  @action.bound
  toggleFilter() {
    this.filterIsActive = !this.filterIsActive;
  }

  render() {
    const {
      recipesStore: {
        randomRecipe,
      },
    } = this.props;

    return (
      <React.Fragment>
        <Container>
          <Title
            text="Random Recipe"
            modifiers="inline-block"
          />

          { this.filterIsActive
            ? null
            : (<Button
              icon="keyboard_arrow_down"
              modifiers="right raised mt10"
              onClick={this.toggleFilter}
              text="Show filter"
            />) }
        </Container>

        { this.filterIsActive
          ? <RandomRecipeFilter toggleFilter={this.toggleFilter} />
          : null }

        { randomRecipe ? <RecipeItem recipe={randomRecipe} /> : null }
      </React.Fragment>
    );
  }
}

export default RecipeList;
