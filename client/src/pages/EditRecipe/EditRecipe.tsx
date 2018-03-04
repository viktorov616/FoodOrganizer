import * as React     from 'react';

import * as cx        from 'classnames';
import AddRecipeForm  from 'components/forms/RecipeForm';
import Container      from 'components/layout/Container';
import Title          from 'components/typography/Title';
import Notifications  from 'components/notifications';

import { action,
         observable } from 'mobx';

interface AddRecepieProps {

}

class EditRecipe extends React.Component<AddRecepieProps> {
  render() {
    return (
      <Container>
        <Notifications />
        <Title text="Edit recipe" />
        <AddRecipeForm type="edit" />
      </Container>
    );
  }
}

export default EditRecipe;
