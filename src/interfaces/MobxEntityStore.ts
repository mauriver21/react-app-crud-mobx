import type { QueryState } from '@/interfaces/QueryState';
import type { QueryStateHandler } from '@/interfaces/QueryStateHandler';

export type MobxEntityStore<TEntity = any> = {
  state: QueryState<TEntity>;
  stateHandler: QueryStateHandler<TEntity>;
};
