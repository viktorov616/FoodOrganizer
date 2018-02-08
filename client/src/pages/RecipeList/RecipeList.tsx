import * as React from 'react';

import Container      from 'components/layout/Container';
import Title          from 'components/typography/Title';


class RecipeList extends React.Component {
  render() {
    return (
      <Container>
        <Title text="Recipe list" />
      </Container>
    );
  }
}

export default RecipeList;
