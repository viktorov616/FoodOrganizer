import * as React   from 'react';

import * as cx      from 'classnames';

import { getClass } from 'utils/getClass';

interface TableCellProps {
  colSpan?: number;
  modifiers?: string;
  units?: string;
  width?: number;
}

export const Table: React.SFC<{ modifiers?: string }> = ({
  children,
  modifiers,
}) => (
  <table className={getClass('table', modifiers)}>{ children }</table>
);

export const Thead: React.SFC = ({
  children,
}) => (
  <thead className="table__head">{ children }</thead>
);

export const Th: React.SFC<TableCellProps> = ({
  children,
  colSpan,
  modifiers,
  units,
  width,
}) => (
  <th
    className={getClass('table__th', modifiers)}
    colSpan={colSpan}
    style={{
      width: `${width}${units}`,
    }}
  >
    { children }
  </th>
);

export const Tbody: React.SFC = ({
  children,
}) => (
  <tbody className="table__body">{ children }</tbody>
);

export const Tr: React.SFC<{ modifiers?: string, isHeader?: boolean }> = ({
  isHeader,
  children,
  modifiers,
}) => (
  <tr
    className={cx(getClass('table__tr', modifiers), { 'table-header': isHeader })}
  >
    { children }
  </tr>
);

export const Td: React.SFC<TableCellProps> = ({
  children,
  colSpan,
  modifiers,
  units,
  width,
}) => (
  <td
    className={getClass('table__td', modifiers)}
    colSpan={colSpan}
    style={{
      width: `${width}${units}`,
    }}
  >
    { children }
  </td>
);

const TableCellDefaultProps = {
  units: '%',
  colSpan: 1,
  width: 100,
};

Td.defaultProps = TableCellDefaultProps;
Th.defaultProps = TableCellDefaultProps;

export default Table;
