import * as React       from 'react';

import Container        from 'components/layout/Container';
import TagInput         from 'components/forms/common/TagInput';
import Filter           from 'components/Filter';

import { recipesStore } from 'stores/recipes';
import { observer,
         inject     }   from 'mobx-react';

const FILTER_INPUTS = [
  'name',
  'ingredient',
  'tag',
];

interface RecipesFilterProps {
  recipesStore?: recipesStore;
  toggleFilter: () => void;
}

@inject('recipesStore')
@observer
class RecipesFilter extends React.Component<RecipesFilterProps> {
  handleUpdateFilter = (key, value) => {
    const {
      recipesStore: { updateFilter },
    } = this.props;

    updateFilter(key, value.map(item => item[key]));
  }

  render() {
    const { toggleFilter } = this.props;

    return (
      <Filter toggleFilter={toggleFilter}>
        <Container
          flex
          flexModifiers="jc-sb end"
        >
          { FILTER_INPUTS.map(input => (
            <TagInput
              addTagOnBlur
              additionalClass="recipe-filter__input"
              key={input}
              label={input.replace(/^.{1}/, symbol => symbol.toUpperCase())}
              modifiers="without-margin"
              name={input}
              inputs={[{
                id: input,
                name: input,
              }]}
              onTagsUpdate={this.handleUpdateFilter}
            />
          )) }
        </Container>
      </Filter>
    );
  }
}

export default RecipesFilter;
