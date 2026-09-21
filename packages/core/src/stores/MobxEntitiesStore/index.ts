import type { Id } from '@/interfaces/Id';
import type { ListParams } from '@/interfaces/ListParams';
import type { ListQueryParams } from '@/interfaces/ListQueryParams';
import type { MobxEntityStore } from '@/interfaces/MobxEntityStore';
import type { SelectedQuery } from '@/interfaces/SelectedQuery';
import { createQueryState } from '@/utils/createQueryState';
import { createQueryStateHandler } from '@/utils/createQueryStateHandler';
import { makeAutoObservable, observable } from 'mobx';

class MobxEntitiesStore {
  stores: Record<string, MobxEntityStore> = {};

  constructor() {
    makeAutoObservable(this);
  }

  createStore<TEntity, TFilters = unknown>(args: {
    entityName: string;
    entityIdName: string;
  }) {
    const { entityName, entityIdName } = args;
    const storeExists = Boolean(this.stores[entityName]);

    if (!storeExists) {
      const state = observable(createQueryState<TEntity>());
      const stateHandler = createQueryStateHandler<TEntity, TFilters>({
        entityIdName,
        queryState: state,
      });
      this.stores[entityName] = {
        state,
        stateHandler,
      };
    }

    const list = (params: ListQueryParams<TEntity, TFilters>) => {
      this.stores[entityName].stateHandler.saveQuery(params);
    };

    const save = (entity: TEntity) => {
      this.stores[entityName].stateHandler.saveById(entity);
    };

    const remove = (id: Id) => {
      this.stores[entityName].stateHandler.removeById(id);
    };

    const setListing = (args: { params: ListParams; flag: boolean }) => {
      this.stores[entityName].stateHandler.setListing(args);
    };

    const setListed = (params: ListParams) => {
      this.stores[entityName].stateHandler.setListed(params);
    };

    const selectPaginatedList = (
      params: ListParams<TFilters>,
    ): SelectedQuery<TEntity> => {
      return this.stores[entityName].stateHandler.selectQuery(params);
    };

    const selectById = (id: Id): TEntity => {
      return this.stores[entityName].stateHandler.selectEntity(id);
    };

    return {
      list,
      save,
      remove,
      selectPaginatedList,
      selectById,
      setListing,
      setListed,
    };
  }
}

export const mobxEntitiesStore = new MobxEntitiesStore();
