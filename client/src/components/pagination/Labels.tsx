import * as React   from 'react';

import MaterialIcon from 'components/icons/MaterialIcon';

export const PreviousLabel: React.SFC = () => (
  <MaterialIcon baseClass="pagination__action-label" icon="keyboard_arrow_left" />
);

export const NextLabel: React.SFC = () => (
  <MaterialIcon baseClass="pagination__action-label" icon="keyboard_arrow_right" />
);
