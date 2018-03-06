import * as React                from 'react';

import Image, { ImagePropsType } from 'components/images/Image';
import RatingPicker              from 'components/RatingPicker';
import Tag                       from 'components/Tag';
import Title                     from 'components/typography/Title';

import { RATING_LIST }           from 'constants/general';
import { ParamsList,
         ParamsListItem }        from 'components/lists/ParamsList';
import { Link }                  from 'react-router-dom';
import { getClass }              from 'utils/getClass';
import { getRecipeImageSrc }     from 'utils/common';
import { recipeFromDb }          from 'stores/recipes';

interface RecipeItemProps {
  recipe: recipeFromDb;
}

const RecipeItem: React.SFC<RecipeItemProps> = ({
  recipe: {
    description,
    ingredients,
    name,
    photo,
    rating,
    slug,
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

      <RatingPicker
        readOnly
        ratingList={RATING_LIST}
        modifiers="medium-margin"
        value={rating}
      />

      <p>{ description }</p>

      <div className="recipe-item__tags">
        { tags.map(tag => (
          <Tag
            key={tag}
            withButton={false}
            text={tag}
          />
        )) }
      </div>

      <div className="recipe-item__actions">
        <Link
          className={getClass('btn', 'link')}
          to={`/recipes/${slug}`}
        >
          View details
        </Link>

        <Link
          className={getClass('btn', 'link')}
          to={`/recipes/${slug}/edit`}
        >
          Edit
        </Link>
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
