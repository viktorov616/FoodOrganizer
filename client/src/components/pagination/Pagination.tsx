import * as React             from 'react';

import * as cx                from 'classnames';
import Button                 from 'components/Button';
import MaterialIcon           from 'components/icons/MaterialIcon';
import PaginationPage         from './PaginationPage';

import { PAGES_RANGE,
         MARGIN_PAGES_RANGE } from 'constants/pagination';
import { getClass }           from 'utils/getClass';
import { PreviousLabel,
         NextLabel      }     from './Labels';

interface PaginationProps {
  breakLabel: string|JSX.Element;
  currentPage: number;
  marginPagesRange: number;
  nextLabel?: string|JSX.Element;
  onPageChange: (page: number) => void;
  pagesCount: number;
  pagesRange: number;
  previousLabel?: string|JSX.Element;
}
const Pagination:React.SFC<PaginationProps> = ({
  breakLabel,
  currentPage,
  marginPagesRange,
  nextLabel,
  onPageChange,
  pagesCount,
  pagesRange,
  previousLabel,
}) => {
  function goToNext() {
    onPageChange(currentPage + 1);
  }

  function goToPrevious() {
    onPageChange(currentPage - 1);
  }

  function renderPages() {
    let pages;

    if (pagesCount <= pagesRange) {
      // tslint:disable-next-line
      pages = new Array(pagesCount).fill('').map((item, i) => (
        <PaginationPage
          currentPage={currentPage}
          onPageChange={onPageChange}
          key={i}
          page={i}
        />
      ));
    } else {
      let leftSide  = (pagesRange / 2);
      let rightSide = (pagesRange - leftSide);

      if (currentPage > pagesCount - pagesRange / 2) {
        rightSide = pagesCount - currentPage;
        leftSide  = pagesRange - rightSide;
      } else if (currentPage < pagesRange / 2) {
        leftSide  = currentPage;
        rightSide = pagesRange - leftSide;
      }

      // tslint:disable-next-line
      pages = new Array(pagesCount).fill('').reduce(
        (result, item, i) => {
          if ((i + 1 <= marginPagesRange)
            || (i + 1 > pagesCount - marginPagesRange)
            || ((i >= currentPage - leftSide) && (i <= currentPage + rightSide))
            ) {
            return [
              ...result,
              (<PaginationPage
                currentPage={currentPage}
                onPageChange={onPageChange}
                key={i}
                page={i}
              />),
            ];
          }

          return [
            ...result,
            (result[i - 1] && !result[i - 1].props['data-is-break-label'])
              ? (<li
                className="pagination__break-label"
                data-is-break-label
                key={i}
              >
                { breakLabel }
              </li>)
              : null,
          ];
        },
        [],
      );
    }

    return pages;
  }

  return (
    (pagesCount > 1)
      ? (<ul className="pagination">
        <li className="pagination__action">
          <Button
            className="pagination__action-button"
            disabled={currentPage === 0}
            onClick={goToPrevious}
            text={previousLabel}
          />
        </li>

        { renderPages() }

        <li className="pagination__action">
          <Button
            className="pagination__action-button"
            disabled={currentPage === pagesCount - 1}
            onClick={goToNext}
            text={nextLabel}
          />
        </li>
      </ul>)
      : null
  );
};

Pagination.defaultProps = {
  breakLabel: '...',
  marginPagesRange: MARGIN_PAGES_RANGE,
  nextLabel: <NextLabel />,
  pagesRange: PAGES_RANGE,
  previousLabel: <PreviousLabel />,
};

export default Pagination;
