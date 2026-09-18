import type { PaginationResponse } from './PaginationResponse';
import type { Id } from './Id';

export type Query = {
  queryId: string;
  entityIds: Id[];
  pagination: PaginationResponse;
};
