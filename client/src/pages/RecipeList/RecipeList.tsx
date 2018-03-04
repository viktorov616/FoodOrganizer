import * as React       from 'react';

import Container        from 'components/layout/Container';
import Title            from 'components/typography/Title';
import RecipeItem       from './RecipeItem';
import Loader           from 'components/Loader';

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
      },
    } = this.props;

    getRecipes();
  }

  render() {
    const {
      recipesStore: {
        isSendingRequest,
        recipes,
      },
    } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Title text="Recipe list" />
        </Container>

        <div className="recipe-list__list">
          { recipes.map(recipe => (
            <RecipeItem
              key={recipe._id}
              recipe={recipe}
            />
          )) }
        </div>

        <Loader isActive={isSendingRequest} />
      </React.Fragment>
    );
  }
}

export default RecipeList;
