import * as React      from 'react';

import Button          from 'components/Button';
import Input           from 'components/forms/Input';
import RatingPicker    from 'components/RatingPicker';
import Select          from 'components/forms/Select';
import TagInput        from 'components/forms/TagInput';
import Textarea        from 'components/forms/Textarea';

import { RATING_LIST } from 'constants/general';
import { getClass }    from 'utils/getClass';
import { action,
  observable,
  useStrict  } from 'mobx';

interface AddRecipeFormProps {
  onSubmit: (data: data) => any;
}

interface AddRecipeFormState {
  data;
}

interface data {
  description: string;
  ingredients: ingredient[];
  name: string;
  rating: number;
  type: string;
}

interface ingredient {
  amount: string;
  name: string;
}

class AddRecipeForm extends React.Component<AddRecipeFormProps> {
  @observable data = {
    description: '',
    ingredients: [],
    name: '',
    rating: 0,
    type: '',
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;

    onSubmit(this.data);
  }

  @action.bound
  handleFormDataChange(name: string, value: string|number|{ [key: string]: string }[]) {
    if (name === 'type') {
      this.data[name] = (typeof value === 'object') ? value[name] : value;
    } else {
      this.data[name] = value;
    }
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
              onChange={this.handleFormDataChange}
            />

            <TagInput
              btn="Add ingredient"
              label="Ingredients"
              name="ingredients"
              inputs={[{
                id: 'ingredients[name]',
                label: 'Name',
                name: 'ingredients[name]',
              }, {
                id: 'ingredients[amount]',
                label: 'Amount',
                name: 'ingredients[amount]',
              }]}
              onTagsUpdate={this.handleFormDataChange}
            />

            <TagInput
              label="Type"
              name="type"
              inputs={[{
                id: 'type',
                name: 'type',
              }]}
              onTagsUpdate={this.handleFormDataChange}
            />

            <Textarea
              id="description"
              label="Description"
              onChange={this.handleFormDataChange}
            />

            <RatingPicker
              ratingList={RATING_LIST}
              label="Rating"
              onChange={this.handleFormDataChange}
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
