import * as React     from 'react';

import * as cx        from 'classnames';
import Textarea       from 'components/forms/common/Textarea';

import { getClass }   from 'utils/getClass';
import { action,
         observable } from 'mobx';
import { observer }   from 'mobx-react';

interface StepProps {
  id: string;
  label: string;
  name: string;
  num: number;
  onTextChange: (step: number, value: string) => void;
  text: string;
}

@observer
class Step extends React.Component<StepProps> {
  @observable focused = false;

  @action
  handleFocus = (focused: boolean) => {
    this.focused = focused;
  }

  handleTextChange = (name: string, text: string) => {
    const {
      num,
      onTextChange,
    } = this.props;

    onTextChange(num, text);
  }

  render() {
    const {
      id,
      label,
      num,
      text,
    } = this.props;

    return (
      <div className={getClass('step', cx({ active: this.focused }))}>
        <label
          htmlFor={id}
          className="step__label"
        >
          <span className="step__label-number">{ num }</span>
          <span className="step__label-text">{ label }</span>
        </label>

        <Textarea
          id="description"
          modifiers="step-form"
          name="description"
          rows={2}
          onFocus={this.handleFocus}
          onChange={this.handleTextChange}
          value={text}
        />
      </div>
    );
  }
}

export default Step;
