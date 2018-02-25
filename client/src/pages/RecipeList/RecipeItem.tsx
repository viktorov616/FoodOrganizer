import * as React                from 'react';

import Tag                       from 'components/Tag';
import Title                     from 'components/typography/Title';
import Image, { ImagePropsType } from 'components/images/Image';

import { ParamsList,
         ParamsListItem }        from 'components/lists/ParamsList';
import { recipeFromDb }          from 'stores/recipes';
import { getRecipeImageSrc }     from 'utils/common';

interface RecipeItemProps {
  recipe: recipeFromDb;
}

const RecipeItem: React.SFC<RecipeItemProps> = ({
  recipe: {
    description,
    ingredients,
    name,
    photo,
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

    <Image
      alt="Recipe image"
      src={getRecipeImageSrc(photo)}
      type={ImagePropsType.WITH_SRC}
      wrapperClass="recipe-item__image-wrapper"
    />
  </div>
);

export default RecipeItem;
