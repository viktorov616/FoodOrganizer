import * as React         from 'react';

import Tag                from 'components/Tag';
import Title              from 'components/typography/Title';

import { ParamsList,
         ParamsListItem } from 'components/lists/ParamsList';
import { recipe }         from 'stores/recipes';

interface RecipeItemProps {
  recipe;
}

const RecipeItem: React.SFC<RecipeItemProps> = ({
  recipe: {
    name,
    description,
    tags,
    photo,
    ingredients,
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

    <div className="recipe-item__ingredients">
      <ParamsList>
        { ingredients.map(({ name, amount }) => (
          <ParamsListItem
            itemKey={name}
            key={`${name}${amount}`}
            value={amount}
          />
        )) }
      </ParamsList>
    </div>

    <div className="recipe-item__image-wrapper">
      <img
        src={(photo) ? `public/uploads/${photo}` : 'client/images/recipe_default.jpeg' }
        alt="Recipe image"
      />
    </div>
  </div>
);

export default RecipeItem;
