import * as React     from 'react';

import Button         from 'components/Button';
import Container      from 'components/layout/Container';
import Input          from 'components/forms/common/Input';
import TagInput       from 'components/forms/common/TagInput';
import Title          from 'components/typography/Title';
import Filter         from 'components/Filter';

import { recipesStore } from 'stores/recipes';
import { observer,
         inject     } from 'mobx-react';
import { action,
         observable } from 'mobx';

const FILTER_INPUTS = [
  'name',
  'ingredient',
  'tag',
];

interface RandomRecipeProps {
  recipesStore?: recipesStore;
  toggleFilter: () => void;
}

@inject('recipesStore')
@observer
class RandomRecipeFilter extends React.Component<RandomRecipeProps> {
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

        <Container
          flex
          flexModifiers="jc-fe"
        >
          <Button
            modifiers="raised"
            onClick={() => {}}
            text="Apply filter"
          />
        </Container>
      </Filter>
    );
  }
}

export default RandomRecipeFilter;
