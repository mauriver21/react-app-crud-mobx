import type { QueryState } from '@/interfaces/QueryState';

export const createQueryState = <T>(): QueryState<T> => ({
  queries: [],
  byId: {},
});
