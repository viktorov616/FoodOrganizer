import { DEFAULT_ITEMS_PER_PAGE,
         START_PAGE              } from 'constants/pagination';

export function getPaginationIndexes({
  currentPage = START_PAGE,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}) {
  const minIndex = currentPage * itemsPerPage;
  const maxIndex = currentPage * itemsPerPage + itemsPerPage;

  return {
    maxIndex,
    minIndex,
  };
}
