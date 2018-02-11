import * as React from 'react';

import Tag        from 'components/Tag';
import Title      from 'components/typography/Title';

import { recipe } from 'stores/recipes';

interface RecipeItemProps {
  recipe;
}

const RecipeItem: React.SFC<RecipeItemProps> = ({
  recipe: {
    name,
    description,
    tags,
  },
}) => (
  <div className="recipe-item">
    <div className="recipe-item__description">
      <Title
        text={name}
        size="3"
        modifiers="without-underline low-margin"
      />

      <p>{ description }</p>

      <div>
        { tags.map(tag => (
          <Tag
            key={tag}
            withButton={false}
            text={tag}
          />
        )) }
      </div>
    </div>
  </div>
);

export default RecipeItem;
