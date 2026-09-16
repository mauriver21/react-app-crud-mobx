import type { QueryState } from '@/interfaces/QueryState';

export const saveById = <T>(params: {
  byId: QueryState<T>['byId'];
  entity: T;
  entityIdName: string;
}) => {
  const { byId, entity, entityIdName } = params;
  byId[entityIdName] = entity;
};
