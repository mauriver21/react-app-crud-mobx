import type { QueryHandlers } from './MobxModelTypes';

export type MobxModelParams<
  TEntity = any,
  TFilters = unknown,
  THandlers extends QueryHandlers<any, any> = QueryHandlers<TEntity, TFilters>,
> = {
  entityName: string;
  entityIdName: string;
  handlers: THandlers;
};
