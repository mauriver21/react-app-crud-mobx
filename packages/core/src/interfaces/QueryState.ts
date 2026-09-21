import type { ObservableMap } from 'mobx';
import type { Query } from '@/interfaces/Query';

export interface QueryState<TEntity = unknown> {
  queries: Query[];
  byId: ObservableMap<string, TEntity>;
}
