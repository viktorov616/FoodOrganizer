import * as React from 'react';

import { recipe } from 'stores/recipes';

interface RecipeItemProps {
  recipe;
}

const RecipeItem: React.SFC<RecipeItemProps> = ({ recipe }) => (
  <p>{ recipe.name }</p>
);

export default RecipeItem;
