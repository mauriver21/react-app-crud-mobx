import { useProductApiClient } from '@/apiClients/useProductApiClient';
import { productStore } from '@/stores/ProductStore';
import type { Product } from '@/interfaces/Product';
import type { ListParams } from '@/interfaces/ListParams';
import type { ProductFilters } from '@/interfaces/ProductFilters';

export const useProductModel = () => {
  const productApiClient = useProductApiClient();

  const list = async (params: ListParams<ProductFilters>) => {
    productStore.list({
      ...params,
      paginatedList: await productApiClient.list(params),
    });
  };

  const read = async (id: string) => {
    return productStore.save(await productApiClient.read(id));
  };

  const create = async (product: Product) => {
    productStore.save(await productApiClient.create(product));
  };

  const update = async (product: Product) => {
    productStore.save(await productApiClient.update(product));
  };

  const remove = async (id: string | undefined) => {
    productStore.remove(id);
  };

  const selectPaginatedProducts = (params: ListParams<ProductFilters>) => {
    return productStore.selectPaginatedList(params);
  };

  return {
    list,
    read,
    create,
    update,
    remove,
    selectPaginatedProducts,
  };
};
