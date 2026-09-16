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
  const { byId } = queryState;

  const saveById = (entity: TEntity) => {
    const id = (entity as any)?.[entityIdName] as string;
    byId[String(id)] = entity;
  };

  const removeById = (id: Id) => {
    id && delete byId[id];
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
      if (id) entities.push(byId[String(id)]);
    }

    return entities;
  };

  const saveQuery = (params: ListQueryParams<TEntity>) => {
    const queryId = buildQueryId(params);
    const foundQuery = findQuery(queryId);
    const entities = params.paginatedList.content;
    const entityIds = entities.map((entity) => (entity as any)?.[entityIdName]);

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

  return { saveById, saveQuery, removeById, selectQuery };
};
