import type { Query } from './Query';

export interface QueryState<TEntity = unknown> {
  queries: Query[];
  byId: Record<string, TEntity>;
}
