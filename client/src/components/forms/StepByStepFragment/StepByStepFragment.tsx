import * as React      from 'react';

import Button          from 'components/Button';
import Textarea        from 'components/forms/common/Textarea';
import Step            from './Step';

import { action,
         observable,
         toJS        } from 'mobx';

interface StepByStepFragmentProps {

}

class StepByStepFragment extends React.Component<StepByStepFragmentProps> {
  @observable steps = 1;


  @action
  addStep = () => {
    this.steps++;
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Step
            id="1"
            name="step"
            label="Step 1"
            num={1}
          />
        </div>

        <Button
          icon="add_circle"
          onClick={this.addStep}
          text="Add step"
          modifiers="raised single"
          type="button"
        />
      </React.Fragment>
    );
  }
}

export default StepByStepFragment;
