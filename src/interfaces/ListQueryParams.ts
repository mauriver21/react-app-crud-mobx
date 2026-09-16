import type { PaginatedList } from '@/interfaces/PaginatedList';
import type { Pagination } from '@/interfaces/Pagination';

export type ListQueryParams<TEntity, TFilters = unknown> = {
  paginatedList: PaginatedList<TEntity>;
  pagination: Pagination;
  filters?: TFilters;
};
