import type { PaginationResponse } from '@/interfaces/PaginationResponse';
import type { Id } from './Id';
import type { QueryFlags } from '@/interfaces/QueryFlags';

export type Query = {
  flags?: QueryFlags;
  queryId: string;
  queryKey?: string;
  entityIds?: Id[];
  pagination?: PaginationResponse;
};
