// Hook principal
export { useMobxModel } from './models/useMobxModel';

// Store
export { mobxEntitiesStore } from './stores/MobxEntitiesStore';

// Enum y tipos de acción
export { EntityActionType } from './interfaces/MobxModelTypes';
export type {
  ListQueryHandler,
  CreateQueryHandler,
  UpdateQueryHandler,
  ReadQueryHandler,
  RemoveQueryHandler,
  QueryHandler,
  QueryHandlers,
  ModelMethods,
} from './interfaces/MobxModelTypes';

// Interfaces de modelo
export type { MobxModelParams } from './interfaces/MobxModelParams';
export type { MobxEntityStore } from './interfaces/MobxEntityStore';
export type { BaseQueryStore } from './interfaces/BaseQueryStore';

// Interfaces de query state
export type { QueryState } from './interfaces/QueryState';
export type { QueryStateHandler } from './interfaces/QueryStateHandler';
export type { Query } from './interfaces/Query';

// Interfaces de paginación y lista
export type { PaginatedList } from './interfaces/PaginatedList';
export type { Pagination } from './interfaces/Pagination';
export type { PaginationResponse } from './interfaces/PaginationResponse';
export type { ListParams } from './interfaces/ListParams';
export type { ListQueryParams } from './interfaces/ListQueryParams';

// Tipos base
export type { Id } from './interfaces/Id';

// Utils
export { createQueryState } from './utils/createQueryState';
export { createQueryStateHandler } from './utils/createQueryStateHandler';
export { paginateData } from './utils/paginateData';
