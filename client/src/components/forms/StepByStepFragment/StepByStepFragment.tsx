import * as React      from 'react';

import Button          from 'components/Button';
import Textarea        from 'components/forms/common/Textarea';
import Step            from './Step';

import { action,
         observable,
         toJS        } from 'mobx';
import { observer }    from 'mobx-react';
import { step }        from 'interfaces/stepByStepFragment';

interface StepByStepFragmentProps {
  onStepsChange: (name: string, value: step[]) => void;
}

@observer
class StepByStepFragment extends React.Component<StepByStepFragmentProps> {
  @observable steps = [{
    num: 1,
    text: '',
  }];

  @action
  addStep = () => {
    this.steps.push({
      num: this.steps.length + 1,
      text: '',
    });
  }

  @action
  removeStep = (step) => {

  }

  @action
  handleTextChange = (step, value) => {
    const { onStepsChange } = this.props;

    this.steps.forEach((item) => {
      if (item.num === step) {
        item.text = value;
      }
    });

    onStepsChange('steps', this.steps);
  }

  isAddStepsDisabled() {
    return this.steps[this.steps.length - 1].text === '';
  }

  render() {
    return (
      <React.Fragment>
        <div>
          { this.steps.map(({ num, text }) => (
            <Step
              id={`step-${1}`}
              key={num}
              label={`Step ${num}`}
              name={`step-${num}`}
              num={num}
              text={text}
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
