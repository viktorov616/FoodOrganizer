import * as React   from 'react';

import Button   from 'components/Button';
import Input    from 'components/forms/Input';
import Select   from 'components/forms/Select';
import TagInput from 'components/forms/TagInput';
import Textarea from 'components/forms/Textarea';

import { getClass } from 'utils/getClass';

interface AddRecipeFormProps {

}

class AddRecipeForm extends React.Component<AddRecipeFormProps> {
  handleSubmit = () => {
    console.log('submit');
  }

  render() {
    return (
      <div className="row">
        <div className="col g--6">
          <form onSubmit={this.handleSubmit}>
            <Input
              id="name"
              label="Name"
            />

            <TagInput
              id="ingredients"
              label="Ingredients"
            />

            <Textarea
              id="description"
              label="Description"
            />

            <Button
              text="Submit"
              icon="send"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddRecipeForm;
