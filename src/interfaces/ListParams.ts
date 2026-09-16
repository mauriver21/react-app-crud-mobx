import type { Pagination } from '@/interfaces/Pagination';

export type ListParams<TFilters = unknown> = {
  pagination: Pagination;
  filters?: TFilters;
};
