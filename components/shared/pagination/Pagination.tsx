import {Stack, ThemeTypings} from '@chakra-ui/react';
import {PaginationItem} from '@/components/shared/pagination/PaginationItem';

type PaginationProps = {
  onPageChange: (page: number) => void;
  currentPage: number;
  lastPage: number;
  nextPages: number[];
  previousPages: number[];
  siblingsCount: number;
  colorScheme?: ThemeTypings['colorSchemes'];
};
export function Pagination({
  onPageChange,
  currentPage,
  lastPage,
  nextPages,
  previousPages,
  siblingsCount,
  colorScheme,
}: PaginationProps): JSX.Element {
  return (
    <Stack direction="row" mb="8" justify="flex-end" align="center" spacing="6">
      <Stack direction="row" spacing="4">
        {currentPage > 1 + siblingsCount ? (
          <>
            <PaginationItem
              colorScheme={colorScheme}
              onPageChange={onPageChange}
              page={1}
            />
            {currentPage > 2 + siblingsCount ? (
              <PaginationItem
                colorScheme={colorScheme}
                onPageChange={onPageChange}
                page={currentPage}
                isBackwards
              />
            ) : null}
          </>
        ) : null}

        {previousPages.length > 0
          ? previousPages.map((page) => (
              <PaginationItem
                colorScheme={colorScheme}
                onPageChange={onPageChange}
                page={page}
                key={page}
              />
            ))
          : null}

        <PaginationItem
          colorScheme={colorScheme}
          onPageChange={onPageChange}
          page={currentPage}
          isCurrent
        />

        {nextPages.length > 0
          ? nextPages.map((page) => (
              <PaginationItem
                colorScheme={colorScheme}
                onPageChange={onPageChange}
                page={page}
                key={page}
              />
            ))
          : null}

        {currentPage + siblingsCount < lastPage ? (
          <>
            {currentPage + 1 + siblingsCount < lastPage ? (
              <PaginationItem
                colorScheme={colorScheme}
                onPageChange={onPageChange}
                page={currentPage}
                isForwards
              />
            ) : null}
            <PaginationItem
              colorScheme={colorScheme}
              onPageChange={onPageChange}
              page={lastPage}
            />
          </>
        ) : null}
      </Stack>
    </Stack>
  );
}

Pagination.displayName = 'Pagination';
