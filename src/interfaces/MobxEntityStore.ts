import type { QueryState } from '@/interfaces/QueryState';
import type { QueryStateHandler } from '@/interfaces/QueryStateHandler';

export type MobxEntityStore = {
  state: QueryState<any>;
  stateHandler: QueryStateHandler<any>;
};
