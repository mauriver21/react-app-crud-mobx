import type { Query } from '@/interfaces/Query';

export interface QueryState<TEntity = unknown> {
  queries: Query[];
  byId: Record<string, TEntity>;
}
