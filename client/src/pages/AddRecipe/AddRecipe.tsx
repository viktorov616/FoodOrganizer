import * as React    from 'react';

import * as cx       from 'classnames';
import AddRecipeForm from './AddRecipeForm';
import Container     from 'components/layout/Container';
import Title         from 'components/typography/Title';


interface AddRecepieProps {

}

class AddRecipe extends React.Component<AddRecepieProps> {
  render() {
    return (
      <Container>
        <Title text="Add recipe" />
        <AddRecipeForm />
      </Container>
    );
  }
}

export default AddRecipe;
