import * as React     from 'react';

import * as cx        from 'classnames';
import AddRecipeForm  from './AddRecipeForm';
import Container      from 'components/layout/Container';
import Title          from 'components/typography/Title';
import axios          from 'axios';

import { action,
         observable,
         useStrict  } from 'mobx';
import { observer, inject }   from 'mobx-react';

useStrict(true);

interface AddRecepieProps {
  addRecipeStore: {
    addRecipe: () => any;
    isSendingRequest: boolean;
  };
}

@inject('addRecipeStore')
@observer
class AddRecipe extends React.Component<AddRecepieProps> {
  render() {
    const {
      addRecipeStore: {
        addRecipe,
      },
    } = this.props;

    return (
      <Container>
        <Title text="Add recipe" />
        <AddRecipeForm />
      </Container>
    );
  }
}

export default AddRecipe;
