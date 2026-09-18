import type { Pagination } from '@/interfaces/Pagination';
import type { PaginatedList } from '@/interfaces/PaginatedList';
import type { Id } from '@/interfaces/Id';

export enum EntityActionType {
  List = 'List',
  Create = 'Create',
  Update = 'Update',
  Read = 'Read',
  Remove = 'Remove',
}

export type ListQueryHandler<TEntity = any, TFilters = any> = {
  action: EntityActionType.List;
  apiFn: (args: {
    pagination: Pagination;
    filters?: TFilters;
  }) => Promise<PaginatedList<TEntity>>;
};

export type CreateQueryHandler<TEntity = unknown> = {
  action: EntityActionType.Create;
  apiFn: (entity: TEntity) => Promise<TEntity>;
};

export type UpdateQueryHandler<TEntity = unknown> = {
  action: EntityActionType.Update;
  apiFn: (entity: TEntity) => Promise<TEntity>;
};

export type ReadQueryHandler<TEntity = unknown> = {
  action: EntityActionType.Read;
  apiFn: (id: Id) => Promise<TEntity>;
};

export type RemoveQueryHandler<TEntity = unknown> = {
  action: EntityActionType.Remove;
  apiFn: (id: Id) => Promise<TEntity>;
};

export type QueryHandler<TEntity, TFilters = unknown> =
  | ListQueryHandler<TEntity, TFilters>
  | CreateQueryHandler<TEntity>
  | UpdateQueryHandler<TEntity>
  | ReadQueryHandler<TEntity>
  | RemoveQueryHandler<TEntity>;

export type QueryHandlers<TEntity = any, TFilters = unknown> = {
  [key: string]: QueryHandler<TEntity, TFilters>;
};

export type ModelMethods<THandlers> = {
  [K in keyof THandlers]: THandlers[K] extends { apiFn: infer F } ? F : never;
};
