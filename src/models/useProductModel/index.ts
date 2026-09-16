import { useProductApiClient } from '@/apiClients/useProductApiClient';
import { productStore } from '@/stores/ProductStore';
import type { Product } from '@/interfaces/Product';
import type { ListParams } from '@/interfaces/ListParams';
import type { ProductFilters } from '@/interfaces/ProductFilters';
import type { Id } from '@/interfaces/Id';

export const useProductModel = () => {
  const productApiClient = useProductApiClient();

  const list = async (params: ListParams<ProductFilters>) => {
    productStore.list({
      ...params,
      paginatedList: await productApiClient.list(params),
    });
  };

  const read = async (id: Id) => {
    return productStore.save(await productApiClient.read(id));
  };

  const create = async (product: Product) => {
    productStore.save(await productApiClient.create(product));
  };

  const update = async (product: Product) => {
    productStore.save(await productApiClient.update(product));
  };

  const remove = async (id: Id) => {
    productStore.remove(id);
  };

  const selectPaginatedProducts = (params: ListParams<ProductFilters>) => {
    return productStore.selectPaginatedList(params);
  };

  const selectProduct = (id: Id) => {
    return productStore.selectById(id);
  };

  return {
    list,
    read,
    create,
    update,
    remove,
    selectPaginatedProducts,
    selectProduct,
  };
};
