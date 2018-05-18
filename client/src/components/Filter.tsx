import * as React from 'react';

import Button     from 'components/Button';
import Title      from 'components/typography/Title';

interface FilterProps {
  toggleFilter: () => void;
}

const Filter: React.SFC<FilterProps> = ({
  children,
  toggleFilter,
}) => (
  <div className="recipe-filter">
    <div className="recipe-filter__header">
      <div className="recipe-filter__header-inner">
        <Title
          text="Filter"
          size="4"
          modifiers={`without-underline white light inline-block
            without-bottom-margin low-top-margin`}
        />

        <Button
          icon="keyboard_arrow_up"
          modifiers="right flat color-primary without-margin"
          onClick={toggleFilter}
          text="Hide filter"
        />
      </div>
    </div>

    { children }
  </div>
);

export default Filter;
