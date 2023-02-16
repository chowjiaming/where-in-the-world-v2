import type {FunctionComponent} from 'react';
import {Button, IconButton, ThemeTypings} from '@chakra-ui/react';
import {FaChevronRight, FaChevronLeft} from 'react-icons/fa';

type PaginationItemProps = {
  isCurrent?: boolean;
  isForwards?: boolean;
  isBackwards?: boolean;
  page: number;
  onPageChange: (page: number) => void;
  colorScheme?: ThemeTypings['colorSchemes'];
};
export const PaginationItem: FunctionComponent<PaginationItemProps> = ({
  isCurrent = false,
  isForwards = false,
  isBackwards = false,
  page,
  onPageChange,
  colorScheme = 'blue',
}): JSX.Element => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme={colorScheme}
        disabled
        _disabled={{
          bg: `${colorScheme}.500`,
          cursor: 'pointer',
        }}
      >
        {page}
      </Button>
    );
  }

  if (isForwards) {
    return (
      <IconButton
        aria-label="Next page"
        size="sm"
        fontSize="xs"
        width="4"
        bg="gray.100"
        _hover={{
          bg: 'gray.300',
        }}
        _dark={{
          bg: 'gray.700',
          _hover: {
            bg: 'gray.500',
          },
        }}
        icon={<FaChevronRight />}
        onClick={() => onPageChange(page + 1)}
      />
    );
  }

  if (isBackwards) {
    return (
      <IconButton
        aria-label="Previous page"
        size="sm"
        fontSize="xs"
        width="4"
        bg="gray.100"
        _hover={{
          bg: 'gray.300',
        }}
        _dark={{
          bg: 'gray.700',
          _hover: {
            bg: 'gray.500',
          },
        }}
        icon={<FaChevronLeft />}
        onClick={() => onPageChange(page - 1)}
      />
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.100"
      _hover={{
        bg: 'gray.300',
      }}
      _dark={{
        bg: 'gray.700',
        _hover: {
          bg: 'gray.500',
        },
      }}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );
};

PaginationItem.displayName = 'PaginationItem';
