import type { PaginationResponse } from '@/interfaces/PaginationResponse';
import type { Id } from './Id';

export type Query = {
  queryId: string;
  entityIds: Id[];
  pagination: PaginationResponse;
};
