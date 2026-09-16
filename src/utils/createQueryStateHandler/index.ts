import type { Id } from '@/interfaces/Id';
import type { ListParams } from '@/interfaces/ListParams';
import type { ListQueryParams } from '@/interfaces/ListQueryParams';
import type { PaginatedList } from '@/interfaces/PaginatedList';
import type { QueryState } from '@/interfaces/QueryState';

export const createQueryStateHandler = <TEntity>(args: {
  queryState: QueryState<TEntity>;
  entityIdName: string;
}) => {
  const { queryState, entityIdName } = args;

  const saveById = (entity: TEntity) => {
    const id = (entity as any)?.[entityIdName] as string;
    queryState.byId[String(id)] = entity;
  };

  const removeById = (id: Id) => {
    id && delete queryState.byId[id];
  };

  const buildQueryId = (params: ListParams) => {
    return JSON.stringify({
      pagination: params.pagination,
      filters: params?.filters,
    });
  };

  const findQuery = (queryId: string) => {
    return queryState.queries.find((query) => query.queryId == queryId);
  };

  const queryIdsToEntities = (entityIds: Id[]): TEntity[] => {
    const entities: TEntity[] = [];
    for (const id of entityIds) {
      if (id) entities.push(queryState.byId[String(id)]);
    }

    return entities;
  };

  const saveQuery = (params: ListQueryParams<TEntity>) => {
    const queryId = buildQueryId(params);
    const foundQuery = findQuery(queryId);
    const entities = params.paginatedList.content;
    const entityIds: Id[] = [];

    for (const entity of entities) {
      entityIds.push((entity as any)?.[entityIdName]);
      saveById(entity);
    }

    if (foundQuery) {
      foundQuery.entityIds = entityIds;
    } else {
      queryState.queries.push({
        queryId,
        entityIds,
        pagination: params.paginatedList.pagination,
      });
    }
  };

  const selectQuery = (params: ListParams<TEntity>): PaginatedList<TEntity> => {
    const queryId = buildQueryId(params);
    const foundQuery = findQuery(queryId);
    return {
      content: queryIdsToEntities(foundQuery?.entityIds || []),
      pagination: {
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        ...foundQuery?.pagination,
      },
    };
  };

  const selectEntity = (entityId: Id): TEntity | undefined => {
    return queryState.byId[String(entityId)];
  };

  return { saveById, saveQuery, removeById, selectQuery, selectEntity };
};
