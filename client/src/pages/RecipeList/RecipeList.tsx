import * as React       from 'react';

import Container        from 'components/layout/Container';
import Loader           from 'components/Loader';
import Pagination       from 'components/pagination';
import RecipeItem       from './RecipeItem';
import Title            from 'components/typography/Title';

import { inject,
         observer }     from 'mobx-react';
import { recipesStore } from 'stores/recipes';
import { action,
         toJS,
         observable }   from 'mobx';

interface RecipeListProps {
  recipesStore?: recipesStore;
}

@inject('recipesStore')
@observer
class RecipeList extends React.Component<RecipeListProps> {
  @observable currentPage = 0;

  componentDidMount() {
    const {
      recipesStore: {
        getRecipes,
      },
    } = this.props;

    getRecipes();
  }

  @action.bound
  onPageChange(page: number) {
    this.currentPage = page;
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

        <Pagination
          pagesCount={3}
          currentPage={this.currentPage}
          onPageChange={this.onPageChange}
        />
        <Loader isActive={isSendingRequest} />
      </React.Fragment>
    );
  }
}

export default RecipeList;
