import * as React                from 'react';

import Image, { ImagePropsType } from 'components/images/Image';
import RatingPicker              from 'components/RatingPicker';
import RecipeIngredients         from './RecipeIngredients';
import Tag                       from 'components/Tag';
import Title                     from 'components/typography/Title';

import { RATING_LIST }           from 'constants/general';
import { getRecipeImageSrc }     from 'utils/common';
import { recipeFromDb }          from 'stores/recipes';

interface RecipeCardProps extends recipeFromDb {
}

const RecipeCard: React.SFC<RecipeCardProps> = ({
  description,
  ingredients,
  name,
  photo,
  rating,
  tags,
}) => (
  <div className="recipe-card">
    <Title
      text={name}
      modifiers="without-underline low-margin"
    />

    <RatingPicker
      readOnly
      ratingList={RATING_LIST}
      modifiers="medium-margin"
      value={rating}
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
