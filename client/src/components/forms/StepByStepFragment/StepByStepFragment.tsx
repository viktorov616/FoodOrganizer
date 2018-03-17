import * as React      from 'react';

import Button          from 'components/Button';
import Textarea        from 'components/forms/common/Textarea';
import Step            from './Step';

import { action,
         observable,
         toJS        } from 'mobx';
import { observer }    from 'mobx-react';

interface StepByStepFragmentProps {
  onStepsChange: (name: string, value: string[]) => void;
}

@observer
class StepByStepFragment extends React.Component<StepByStepFragmentProps> {
  @observable steps = [''];

  @action
  addStep = () => {
    this.steps.push('');
  }

  @action
  removeStep = (step) => {

  }

  @action
  handleTextChange = (step, value) => {
    const { onStepsChange } = this.props;

    this.steps[step - 1] = value;

    console.log(toJS(this.steps));

    onStepsChange('steps', this.steps);
  }

  isAddStepsDisabled() {
    return this.steps[this.steps.length - 1] === '';
  }

  render() {
    return (
      <React.Fragment>
        <div>
          { this.steps.map((step, i) => (
            <Step
              id={`step-${1}`}
              key={i}
              label={`Step ${i + 1}`}
              name={`step-${i + 1}`}
              num={i + 1}
              text={step}
              onTextChange={this.handleTextChange}
            />
          )) }
        </div>

        <Button
          icon="add_circle"
          onClick={this.addStep}
          text="Add step"
          modifiers="raised single"
          type="button"
          disabled={this.isAddStepsDisabled()}
        />
      </React.Fragment>
    );
  }
}

export default StepByStepFragment;
