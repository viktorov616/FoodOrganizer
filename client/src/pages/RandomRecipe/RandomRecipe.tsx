import * as React from 'react';

import Container      from 'components/layout/Container';
import Title          from 'components/typography/Title';


class RecipeList extends React.Component {
  render() {
    return (
      <Container>
        <Title text="Random Recipe" />
      </Container>
    );
  }
}

export default RecipeList;
