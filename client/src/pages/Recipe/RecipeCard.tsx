import * as React                from 'react';

import Image, { ImagePropsType } from 'components/images/Image';
import RecipeIngredients         from './RecipeIngredients';
import Tag                       from 'components/Tag';
import Title                     from 'components/typography/Title';

import { getRecipeImageSrc }     from 'utils/common';
import { recipeFromDb }          from 'stores/recipes';

interface RecipeCardProps extends recipeFromDb {
}

const RecipeCard: React.SFC<RecipeCardProps> = ({
  description,
  ingredients,
  name,
  photo,
  tags,
}) => (
  <div className="recipe-card">
    <Title
      text={name}
      modifiers="without-underline low-margin"
    />

    <div className="recipe-card__tags">
      { tags.map(tag => (
        <Tag
          key={tag}
          withButton={false}
          text={tag}
        />
      )) }
    </div>

    <div className="recipe-card__info">
      <Image
        alt="Recipe image"
        src={getRecipeImageSrc(photo)}
        type={ImagePropsType.WITH_SRC}
        wrapperClass="recipe-card__image-wrapper"
      />

      <RecipeIngredients ingredients={ingredients} />
    </div>
    { description }
  </div>
);

export default RecipeCard;
