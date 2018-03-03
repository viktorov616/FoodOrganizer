import * as React   from 'react';

import { getClass } from 'utils/getClass';

interface LoaderProps {
  modifiers?: string;
  size?: string;
}

const SIZES = {
  button: {
    width: '20px',
    height: '20px',
  },
  regular: {
    width: '100px',
    height: '100px',
  },
};

const Loader: React.SFC<LoaderProps> = ({
  modifiers,
  size,
}) => (
  <div className={getClass('loader', modifiers)}>
    <div className="loader__inner">
      <svg
        { ...SIZES[size] }
        className="loader__svg"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="loader__circle"
          fill="none"
          stroke-width="4"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </div>
  </div>
);

Loader.defaultProps = {
  size: 'regular',
};

export default Loader;
