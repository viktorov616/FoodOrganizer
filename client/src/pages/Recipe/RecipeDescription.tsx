import * as React from 'react';
import * as cx    from 'classnames';

import Title      from 'components/typography/Title';

interface RecipeDescriptionProps {
  description: string;
  modifiers?: string;
}

const RecipeDescription:React.SFC<RecipeDescriptionProps> = ({
  description,
  modifiers,
}) => (
  <div className={cx('recipe-card__description g--5', modifiers)}>
    <Title
      size="4"
      text="Description"
      modifiers="without-underline"
    />

    { description }
  </div>
);

export default RecipeDescription;
