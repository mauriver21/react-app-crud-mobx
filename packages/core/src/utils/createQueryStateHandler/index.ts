import type { Id } from '@/interfaces/Id';
import type { ListParams } from '@/interfaces/ListParams';
import type { ListQueryParams } from '@/interfaces/ListQueryParams';
import type { PaginationResponse } from '@/interfaces/PaginationResponse';
import type { QueryFlags } from '@/interfaces/QueryFlags';
import type { QueryState } from '@/interfaces/QueryState';
import type { SelectedQuery } from '@/interfaces/SelectedQuery';

export const createQueryStateHandler = <TEntity, TFilters = any>(args: {
  queryState: QueryState<TEntity>;
  entityIdName: string;
}) => {
  const { queryState, entityIdName } = args;

  let lastKnownPagination: PaginationResponse | undefined;
  let lastKnownParams: ListParams | undefined;

  const saveById = (entity: TEntity) => {
    const id = (entity as any)?.[entityIdName] as string;
    queryState.byId.set(String(id), entity);
  };

  const removeById = (id: Id) => {
    id && queryState.byId.delete(String(id));
  };

  const buildQueryId = (params: ListParams) => {
    return JSON.stringify({
      queryKey: params?.queryKey,
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
      const entity = queryState.byId.get(String(id));
      if (id && entity) entities.push(entity);
    }

    return entities;
  };

  const saveQuery = (params: ListQueryParams<TEntity, TFilters>) => {
    const queryId = buildQueryId(params);
    const foundQuery = findQuery(queryId);
    const entities = params.paginatedList.content;
    const entityIds: Id[] = [];

    for (const entity of entities) {
      entityIds.push((entity as any)?.[entityIdName]);
      saveById(entity);
    }

    lastKnownPagination = params.paginatedList.pagination;
    lastKnownParams = { pagination: params.pagination, filters: params.filters, queryKey: params.queryKey };

    if (foundQuery) {
      Object.assign(foundQuery, {
        entityIds,
        pagination: params.paginatedList.pagination,
      });
    } else {
      queryState.queries.push({
        flags: {},
        queryId,
        queryKey: params.queryKey,
        entityIds,
        pagination: params.paginatedList.pagination,
      });
    }
  };

  const saveQueryFlags = (args: {
    params: ListParams;
    flags: Partial<QueryFlags>;
  }) => {
    const { params, flags } = args;
    const queryId = buildQueryId(params);
    const foundQuery = findQuery(queryId);

    if (foundQuery) {
      foundQuery.flags = { ...foundQuery.flags, ...flags };
    } else {
      queryState.queries.push({
        flags,
        queryId,
      });
    }
  };

  const selectQuery = (params: ListParams): SelectedQuery<TEntity> => {
    const queryId = buildQueryId(params);
    const foundQuery = findQuery(queryId);

    const flags = foundQuery?.flags ?? {};
    const autoHeal = !flags.listed && !flags.listing;

    return {
      ...flags,
      autoHeal,
      content: queryIdsToEntities(foundQuery?.entityIds || []),
      pagination: {
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        ...lastKnownPagination,
        ...foundQuery?.pagination,
      },
    };
  };

  const setListed = (params: ListParams) => {
    const queryId = buildQueryId(params);
    const foundQuery = findQuery(queryId);
    saveQueryFlags({
      params,
      flags: { listed: Boolean(foundQuery?.entityIds !== undefined) },
    });
  };

  const setListing = (args: { params: ListParams; flag: boolean }) => {
    const { params, flag } = args;
    saveQueryFlags({ params, flags: { listing: flag } });
  };

  const selectEntity = (entityId: Id): TEntity | undefined => {
    return queryState.byId.get(String(entityId));
  };

  const getLastParams = (): ListParams | undefined => lastKnownParams;

  const invalidateQueries = () => {
    queryState.queries.splice(0, queryState.queries.length);
  };

  // Keeps the last consulted query; invalidates all other queries with the same queryKey
  const invalidateOtherQueries = () => {
    if (!lastKnownParams) {
      invalidateQueries();
      return;
    }
    const keepQueryId = buildQueryId(lastKnownParams);
    const keepQueryKey = lastKnownParams.queryKey;

    // Remove only queries that share the same queryKey (or have no queryKey if lastKnownParams has none)
    const surviving = queryState.queries.filter(
      (q) => q.queryKey !== keepQueryKey || q.queryId === keepQueryId,
    );
    queryState.queries.splice(0, queryState.queries.length, ...surviving);
  };

  return {
    saveById,
    saveQuery,
    removeById,
    selectQuery,
    selectEntity,
    setListing,
    setListed,
    getLastParams,
    invalidateQueries,
    invalidateOtherQueries,
  };
};
