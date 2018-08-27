import * as React    from 'react';

import * as cx       from 'classnames';
import RecipeForm    from 'components/forms/RecipeForm';
import Container     from 'components/layout/Container';
import Title         from 'components/typography/Title';
// @ts-ignore
import Notifications from 'components/notifications';

import { action,
         observable } from 'mobx';

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
