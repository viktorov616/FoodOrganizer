import * as React   from 'react';

import Button       from 'components/forms/Button';
import Input        from 'components/forms/Input';
import Select       from 'components/forms/Select';

import { getClass } from 'utils/getClass';

interface AddRecipeFormProps {

}

class AddRecipeForm extends React.Component<AddRecipeFormProps> {
  render() {
    return (
      <div className="row">
        <div className="col g--6">
          <form onSubmit={e => (e.preventDefault(), console.log('submit'))}>
            <Input
              id="name"
              label="Name"
            />

            <Select
              id="blabla"
              options={[{ value: 'carrot', text: 'carrot' }, { value: 'apple', text: 'apple' }]}
              defaultValue="carrot"
              label="Ingredient"
            />

            <Button
              text="Submit"
              icon="send"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddRecipeForm;
