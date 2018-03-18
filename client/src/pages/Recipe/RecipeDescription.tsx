import * as React from 'react';

import Title      from 'components/typography/Title';

interface RecipeDescriptionProps {
  description: string;
}

const RecipeDescription:React.SFC<RecipeDescriptionProps> = ({
  description,
}) => (
  <div className="recipe-card__description g--5 m--1">
    <Title
      size="4"
      text="Description"
      modifiers="without-underline"
    />

    { description }
  </div>
);

export default RecipeDescription;
