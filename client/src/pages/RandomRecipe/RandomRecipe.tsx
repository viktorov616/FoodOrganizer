import * as React         from 'react';

import Button             from 'components/Button';
import Container          from 'components/layout/Container';
import RandomRecipeFilter from './RandomRecipeFilter';
import Title              from 'components/typography/Title';

import { inject,
         observer }       from 'mobx-react';
import { recipesStore }   from 'stores/recipes';
import { action,
         toJS,
         observable }     from 'mobx';

@observer
class RecipeList extends React.Component {
  @observable filterIsActive = false;

  @action.bound
  toggleFilter() {
    this.filterIsActive = !this.filterIsActive;
  }

  render() {
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
      </React.Fragment>
    );
  }
}

export default RecipeList;
