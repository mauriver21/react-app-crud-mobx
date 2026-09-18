import type { QueryState } from './QueryState';

export interface BaseQueryStore<TEntity> {
  state: QueryState<TEntity>;
}
