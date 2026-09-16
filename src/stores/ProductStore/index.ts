import type { BaseQueryStore } from '@/interfaces/BaseQueryStore';
import type { Id } from '@/interfaces/Id';
import type { ListParams } from '@/interfaces/ListParams';
import type { ListQueryParams } from '@/interfaces/ListQueryParams';
import type { Product } from '@/interfaces/Product';
import type { ProductFilters } from '@/interfaces/ProductFilters';
import { createQueryState } from '@/utils/createQueryState';
import { createQueryStateHandler } from '@/utils/createQueryStateHandler';
import { makeAutoObservable } from 'mobx';

export class ProductStore implements BaseQueryStore<Product> {
  entityIdName = 'id';
  state = createQueryState<Product>();
  stateHandler = createQueryStateHandler<Product>({
    entityIdName: 'id',
    queryState: this.state,
  });

  constructor() {
    makeAutoObservable(this);
  }

  list(params: ListQueryParams<Product, ProductFilters>) {
    this.stateHandler.saveQuery(params);
  }

  save(product: Product) {
    this.stateHandler.saveById(product);
  }

  remove(id: Id) {
    this.stateHandler.removeById(id);
  }

  selectPaginatedList(params: ListParams<ProductFilters>) {
    return this.stateHandler.selectQuery(params);
  }
}

export const productStore = new ProductStore();
