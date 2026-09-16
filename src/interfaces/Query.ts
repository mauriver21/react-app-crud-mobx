import type { PaginationResponse } from '@/interfaces/PaginationResponse';

export type Query = {
  queryId: string;
  entityIds: Array<string | number>;
  pagination: PaginationResponse;
};
