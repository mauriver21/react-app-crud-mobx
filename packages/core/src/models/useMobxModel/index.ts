import type { MobxModelParams } from '@/interfaces/MobxModelParams';
import {
  EntityActionType,
  type ModelMethods,
  type QueryHandler,
  type QueryHandlers,
} from '@/interfaces/MobxModelTypes';
import { mobxEntitiesStore } from '@/stores/MobxEntitiesStore';
import { useMemo } from 'react';

export const useMobxModel = <
  TEntity = unknown,
  TFilters = unknown,
  THandlers extends QueryHandlers<any, any> = QueryHandlers<TEntity, TFilters>,
>(
  args: MobxModelParams<TEntity, TFilters, THandlers>,
) => {
  const { handlers } = args;
  const modelStore = useMemo(
    () => mobxEntitiesStore.createStore<TEntity, TFilters>(args),
    [],
  );

  const buildModelMethods = (): ModelMethods<THandlers> => {
    const modelMethods = {} as Record<string, unknown>;

    for (const [key, handler] of Object.entries<
      QueryHandler<TEntity, TFilters>
    >(handlers)) {
      switch (handler.action) {
        case EntityActionType.List:
          modelMethods[key] = async (
            ...params: Parameters<typeof handler.apiFn>
          ) => {
            const listParams = params[0];
            modelStore.setListing({ params: listParams, flag: true });
            try {
              modelStore.list({
                ...listParams,
                paginatedList: await handler.apiFn(...params),
              });
              modelStore.setListed(listParams);
            } catch (error) {
              throw error;
            } finally {
              modelStore.setListing({ params: listParams, flag: false });
            }
          };
          break;
        case EntityActionType.Create:
          modelMethods[key] = async (
            ...params: Parameters<typeof handler.apiFn>
          ) => {
            modelStore.save(...params);
          };
          break;
        case EntityActionType.Update:
          modelMethods[key] = async (
            ...params: Parameters<typeof handler.apiFn>
          ) => {
            modelStore.save(...params);
          };
          break;
        case EntityActionType.Read:
          modelMethods[key] = async (
            ...params: Parameters<typeof handler.apiFn>
          ) => {
            const entity = await handler.apiFn(...params);
            modelStore.save(entity);
            return entity;
          };
          break;
        case EntityActionType.Remove:
          modelMethods[key] = async (
            ...params: Parameters<typeof handler.apiFn>
          ) => {
            modelStore.remove(...params);
          };
          break;
        default:
          break;
      }
    }

    return modelMethods as ModelMethods<THandlers>;
  };

  return {
    ...buildModelMethods(),
    selectPaginatedList: modelStore.selectPaginatedList,
    selectById: modelStore.selectById,
  };
};
