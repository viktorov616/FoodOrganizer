import * as React   from 'react';

interface RecipeCardProps {
  name: string;
}

const RecipeCard: React.SFC<RecipeCardProps> = ({
  name,
  description,
}) => (
  <div className="recipe-card">{ name } { description }</div>
);

export default RecipeCard;
