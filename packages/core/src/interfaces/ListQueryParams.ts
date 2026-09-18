import type { PaginatedList } from './PaginatedList';
import type { Pagination } from './Pagination';

export type ListQueryParams<TEntity, TFilters = unknown> = {
  paginatedList: PaginatedList<TEntity>;
  pagination: Pagination;
  filters?: TFilters;
};
