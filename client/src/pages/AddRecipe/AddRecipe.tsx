import * as React    from 'react';

import RecipeForm    from 'components/forms/RecipeForm';
import Container     from 'components/layout/Container';
import Title         from 'components/typography/Title';
// @ts-ignore
import Notifications from 'components/notifications';

interface AddRecipeProps {

}

class AddRecipe extends React.Component<AddRecipeProps> {
  render() {
    return (
      <Container>
        <Notifications />
        <Title text="Add recipe" />
        <RecipeForm />
      </Container>
    );
  }
}

export default AddRecipe;
