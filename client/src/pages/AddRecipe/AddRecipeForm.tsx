import * as React      from 'react';

import Button          from 'components/Button';
import Input           from 'components/forms/Input';
import RatingPicker    from 'components/RatingPicker';
import Select          from 'components/forms/Select';
import TagInput        from 'components/forms/TagInput';
import Textarea        from 'components/forms/Textarea';

import { getClass }    from 'utils/getClass';
import { RATING_LIST } from 'constants/general';

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
              autofocus
              id="name"
              label="Name"
              name="name"
            />

            <TagInput
              btn="Add ingredient"
              label="Ingredients"
              inputs={[{
                id: 'ingredients[name]',
                label: 'Name',
                name: 'ingredients[name]',
              }, {
                id: 'ingredients[amount]',
                label: 'Amount',
                name: 'ingredients[amount]',
              }]}
            />

            <TagInput
              label="Type"
              inputs={[{
                id: 'type',
                name: 'type',
              }]}
            />

            <Textarea
              id="description"
              label="Description"
            />

            <RatingPicker
              ratingList={RATING_LIST}
              label="Rating"
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
