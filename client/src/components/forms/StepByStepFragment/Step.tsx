import * as React from 'react';

import Textarea        from 'components/forms/common/Textarea';

interface StepProps {
  id: string;
  label: string;
  name: string;
  num: number;
}

const Step:React.SFC<StepProps> = ({
  id,
  label,
  name,
  num,
}) => (
  <div className="step">
    <Textarea
      id="description"
      modifiers="step-form"
      name="description"
      // onChange={this.handleFormDataChange}
      // value={this.data.description}
    />

    <label
      htmlFor={id}
      className="step__label"
    >
      <span className="step__label-number">{ num }</span>
      <span className="step__label-text">{ label }</span>
    </label>
  </div>
);

export default Step;
