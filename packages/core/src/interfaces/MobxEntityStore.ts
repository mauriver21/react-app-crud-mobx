import type { QueryState } from './QueryState';
import type { QueryStateHandler } from './QueryStateHandler';

export type MobxEntityStore<TEntity = any> = {
  state: QueryState<TEntity>;
  stateHandler: QueryStateHandler<TEntity>;
};
