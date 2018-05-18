import * as React   from 'react';

interface FieldsetProps {
  legend?: string;
}

const Fieldset: React.SFC<FieldsetProps> = ({
  children,
  legend,
}) => (
  <fieldset className="fieldset">
    { legend
      ? <legend className="fieldset__legend">{ legend }</legend>
      : null }

    { children }
  </fieldset>
);

export default Fieldset;
