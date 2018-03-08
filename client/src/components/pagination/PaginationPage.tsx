import * as React   from 'react';

import * as cx      from 'classnames';
import Button       from 'components/Button';

import { getClass } from 'utils/getClass';

interface PaginationPageProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  page: number;
}

const PaginationPage: React.SFC<PaginationPageProps> = ({
  currentPage,
  onPageChange,
  page,
}) => {
  const handlePageChange = () => onPageChange(page);

  return (
    <li className="pagination__page">
      <Button
        className={getClass('pagination__page-button', cx({ active: page === currentPage }))}
        onClick={handlePageChange}
        text={`${page + 1}`}
      />
    </li>
  );
};

export default PaginationPage;
