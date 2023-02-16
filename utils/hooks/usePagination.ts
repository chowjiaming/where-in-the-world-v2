import {Options, Pagination} from '@/utils/types/pagination';

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export function usePagination<I>({
  totalRegisters,
  page,
  items,
  itemsPerPage = 10,
  siblingsCount = 1,
}: Options<I>): Pagination<I> {
  const currentPage = page;
  const lastPage = Math.ceil(totalRegisters / itemsPerPage);
  const totalPages = lastPage === 0 ? 1 : lastPage;

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 2 - siblingsCount, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage) + 1
        )
      : [];

  const pageStart = (page - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;
  const pageItems = items.slice(pageStart, pageEnd);

  return {
    pageItems,
    currentPage,
    totalPages,
    lastPage,
    nextPages,
    previousPages,
    itemsPerPage,
    siblingsCount,
  };
}
