import type { Pagination } from './Pagination';

export type ListParams<TFilters = unknown> = {
  pagination: Pagination;
  filters?: TFilters;
};
