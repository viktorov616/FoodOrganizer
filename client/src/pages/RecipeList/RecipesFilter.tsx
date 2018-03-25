import * as React     from 'react';

import Button         from 'components/Button';
import Container      from 'components/layout/Container';
import Input          from 'components/forms/common/Input';
import TagInput       from 'components/forms/common/TagInput';
import Title          from 'components/typography/Title';

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
      <div className="recipe-filter">
        <div className="recipe-filter__header">
          <div className="recipe-filter__header-inner">
            <Title
              text="Filter"
              size="4"
              modifiers={`without-underline white light inline-block
                without-bottom-margin low-top-margin`}
            />

            <Button
              icon="keyboard_arrow_up"
              modifiers="right flat color-primary without-margin"
              onClick={toggleFilter}
              text="Hide filter"
            />
          </div>
        </div>

        <Container
          flex
          flexModifiers="jc-sb end"
        >
          { FILTER_INPUTS.map(input => (
            <TagInput
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

        {/* <Container
          flex
          flexModifiers="jc-fe"
        >
          <Button
            modifiers="raised"
            onClick={() => {}}
            text="Apply filter"
          />
        </Container> */}
      </div>
    );
  }
}

export default RecipesFilter;
