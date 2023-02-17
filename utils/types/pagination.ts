export type PaginationOptions<I> = {
  totalRegisters: number;
  page: number;
  items: I[];
  itemsPerPage?: number;
  siblingsCount?: number;
};

export type PaginationType<I> = {
  pageItems: I[];
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  lastPage: number;
  nextPages: number[];
  previousPages: number[];
  siblingsCount: number;
};

export interface BasePagination {
  page: number;
  totalRegisters: number;
  onPageChange: (page: number) => void;
}

export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};
