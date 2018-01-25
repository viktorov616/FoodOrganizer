import * as React          from 'react';

import * as cx             from 'classnames';
import Container           from 'components/layout/Container';
import Input               from 'components/forms/Input';
import Title               from 'components/typography/Title';
import Select              from 'components/forms/Select';

import { SECONDARY_COLOR } from 'constants/colorTheme';

interface AddRecepieProps {

}

class AddRecipe extends React.Component<AddRecepieProps> {
  render() {
    return (
      <Container>
        <Title text="Add recipe" />

        <div className="row">
          <div className="col g--6">
            <form onSubmit={(e) => (e.preventDefault(), console.log('submit'))}>
              <Input
                id="name"
                label="Name"
              />

              <Select
                options={[{ value: 'carrot', text: 'carrot' }, { value: 'apple', text: 'apple' }]}
                defaultValue="carrot"
                id="blabla"
              />
              <button className="btn--raised">
                Submit
                <i className="material-icons btn__icon">send</i>
              </button>
            </form>
          </div>
        </div>
      </Container>
    );
  }
}

export default AddRecipe;
