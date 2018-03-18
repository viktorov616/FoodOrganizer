import * as React          from 'react';

import Title               from 'components/typography/Title';

import { OrderedList,
         OrderedListItem } from 'components/lists/OrderedList';

interface RecipeStepByStepProps {
  steps: string[];
}

const RecipeStepByStep:React.SFC<RecipeStepByStepProps> = ({
  steps,
}) => (
  <div className="recipe-card__step-by-step g--5">
    <Title
      size="4"
      text="Step by step guide"
      modifiers="without-underline"
    />

    <OrderedList>
      { steps.map((step, i) => (
        <OrderedListItem
          key={i}
          num={i + 1}
          text={step}
        />
      )) }
    </OrderedList>
  </div>
);

export default RecipeStepByStep;
