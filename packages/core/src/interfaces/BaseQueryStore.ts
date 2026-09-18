import type { QueryState } from '@/interfaces/QueryState';

export interface BaseQueryStore<TEntity> {
  state: QueryState<TEntity>;
}
