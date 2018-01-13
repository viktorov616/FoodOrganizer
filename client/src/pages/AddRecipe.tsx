import * as React        from 'react';

import * as cx           from 'classnames';
import Title             from 'components/typography/Title';
import Container         from 'components/layout/Container';

import { SECONDARY_COLOR } from  'constants/colorTheme';

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
              <div className="input-field">
                <input id="name" type="text"/>
                <label
                  htmlFor="name"
                  className="active"
                >
                  Name
                </label>
              </div>
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
