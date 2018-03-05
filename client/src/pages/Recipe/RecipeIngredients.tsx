import * as React     from 'react';

import Title          from 'components/typography/Title';

import { Table,
         Tbody,
         Th,
         Thead,
         Tr,
         Td     }     from 'components/tables//TableElements';
import { ingredient } from 'stores/recipes';

interface RecipeIngredientsProps {
  ingredients: ingredient[];
}

const RecipeIngredients: React.SFC<RecipeIngredientsProps> = ({
  ingredients,
}) => (
  (ingredients)
    ? (<div className="recipe-card__ingredients">
      <Title
        size="4"
        text="Ingredients"
        modifiers="without-underline"
      />

      <Table>
        <Thead>
          <Tr>
            <Th width={75}>Name</Th>
            <Th width={25}>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          { ingredients.map(({ name, amount }) => (
            <Tr key={`${name}-${amount}`}>
              <Td width={75}>{ name }</Td>
              <Td width={25}>{ amount }</Td>
            </Tr>
          )) }
        </Tbody>
      </Table>
    </div>)
    : null
);

export default RecipeIngredients;
