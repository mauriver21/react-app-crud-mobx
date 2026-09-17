import type { Product } from '@/interfaces/Product';
import type { ListParams } from '@/interfaces/ListParams';
import type { ProductFilters } from '@/interfaces/ProductFilters';
import type { Id } from '@/interfaces/Id';
import { useMobxModel } from '../useMobxModel';
import {
  EntityActionType,
  type ListQueryHandler,
  type CreateQueryHandler,
  type UpdateQueryHandler,
  type ReadQueryHandler,
  type RemoveQueryHandler,
} from '@/interfaces/MobxModelTypes';
import { useProductApiClient } from '@/apiClients/useProductApiClient';

export const useProductModel = () => {
  const productApiClient = useProductApiClient();
  const mobxModel = useMobxModel<
    Product,
    ProductFilters,
    {
      list: ListQueryHandler<Product, ProductFilters>;
      create: CreateQueryHandler<Product>;
      update: UpdateQueryHandler<Product>;
      read: ReadQueryHandler<Product>;
      remove: RemoveQueryHandler<Product>;
    }
  >({
    entityIdName: 'id',
    entityName: 'products',
    handlers: {
      list: { action: EntityActionType.List, apiFn: productApiClient.list },
      create: {
        action: EntityActionType.Create,
        apiFn: productApiClient.create,
      },
      update: {
        action: EntityActionType.Update,
        apiFn: productApiClient.update,
      },
      read: { action: EntityActionType.Read, apiFn: productApiClient.read },
      remove: {
        action: EntityActionType.Remove,
        apiFn: productApiClient.remove,
      },
    },
  });

  const list = (params: ListParams<ProductFilters>) => {
    return mobxModel.list(params);
  };

  const read = (id: Id) => {
    return mobxModel.read(id);
  };

  const create = (product: Product) => {
    return mobxModel.create(product);
  };

  const update = (product: Product) => {
    return mobxModel.update(product);
  };

  const remove = (id: Id) => {
    return mobxModel.remove(id);
  };

  const selectPaginatedProducts = mobxModel.selectPaginatedList;

  return {
    list,
    read,
    create,
    update,
    remove,
  };
};
