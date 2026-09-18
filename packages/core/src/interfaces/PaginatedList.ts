import type { PaginationResponse } from './PaginationResponse';

export type PaginatedList<T> = {
  content: T[];
  pagination: PaginationResponse;
};
