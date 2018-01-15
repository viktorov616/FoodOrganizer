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
          <div className="col s6">
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
              <button className={cx('btn', SECONDARY_COLOR)}>
                Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </Container>
    );
  }
}

export default AddRecipe;
