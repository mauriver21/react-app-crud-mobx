import type { Id } from '@/interfaces/Id';
import type { ListParams } from '@/interfaces/ListParams';
import type { ListQueryParams } from '@/interfaces/ListQueryParams';
import type { QueryState } from '@/interfaces/QueryState';
import type { QueryStateHandler } from '@/interfaces/QueryStateHandler';
import { createQueryState } from '@/utils/createQueryState';
import { createQueryStateHandler } from '@/utils/createQueryStateHandler';
import { makeAutoObservable } from 'mobx';

class MobxEntitiesStore {
  stores: Record<
    string,
    { state: QueryState; stateHandler: QueryStateHandler }
  > = {};

  constructor() {
    makeAutoObservable(this);
  }

  createStore<TEntity, TFilters = unknown>(args: {
    entityName: string;
    entityIdName: string;
  }) {
    const { entityName, entityIdName } = args;
    this.stores[entityName].state = createQueryState();
    this.stores[entityName].stateHandler = createQueryStateHandler({
      entityIdName,
      queryState: this.stores[entityName].state,
    });

    const list = (params: ListQueryParams<TEntity, TFilters>) => {
      this.stores[entityName].stateHandler.saveQuery(params);
    };

    const save = (entity: TEntity) => {
      this.stores[entityName].stateHandler.saveById(entity);
    };

    const remove = (id: Id) => {
      this.stores[entityName].stateHandler.removeById(id);
    };

    const selectPaginatedList = (params: ListParams<TFilters>) => {
      return this.stores[entityName].stateHandler.selectQuery(params);
    };

    const selectById = (id: Id) => {
      return this.stores[entityName].stateHandler.selectEntity(id);
    };

    return {
      list,
      save,
      remove,
      selectPaginatedList,
      selectById,
    };
  }
}

export const mobxEntitiesStore = new MobxEntitiesStore();
