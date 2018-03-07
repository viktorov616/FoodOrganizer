import * as React         from 'react';

import * as cx from 'classnames';
import Button             from 'components/Button';
import MaterialIcon       from 'components/icons/MaterialIcon';

import { getClass } from 'utils/getClass';
import { PreviousLabel,
         NextLabel      } from './Labels';

interface PaginationProps {
  currentPage: number;
  nextLabel?: string|JSX.Element;
  pagesCount: number;
  previousLabel?: string|JSX.Element;
  onPageChange: (page: number) => void;
}
const Pagination:React.SFC<PaginationProps> = ({
  currentPage,
  nextLabel,
  onPageChange,
  pagesCount,
  previousLabel,
}) => {
  function goToNext() {
    onPageChange(currentPage + 1);
  }

  function goToPrevious() {
    onPageChange(currentPage - 1);
  }

  function renderPages() {
    // tslint:disable-next-line
    const pages = new Array(pagesCount).fill('').map((item, i) => {
      const handlePageChange = () => onPageChange(i);

      return (
        <li
          className="pagination__page"
          key={i}
        >
          <Button
            className={getClass('pagination__page-button', cx({ active: i === currentPage }))}
            onClick={handlePageChange}
            text={`${i + 1}`}
          />
        </li>
      );
    });

    return pages;
  }

  return (
    <ul className="pagination">
      <li className="pagination__action">
        <Button
          className="pagination__action-button"
          onClick={goToPrevious}
          text={previousLabel}
        />
      </li>

      { renderPages() }

      <li className="pagination__action">
        <Button
          className="pagination__action-button"
          onClick={goToNext}
          text={nextLabel}
        />
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  nextLabel: <NextLabel />,
  previousLabel: <PreviousLabel />,
};

export default Pagination;
