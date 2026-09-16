import { useProductApiClient } from '@/apiClients/useProductApiClient';
import { productStore } from '@/stores/ProductStore';
import type { Product } from '@/interfaces/Product';

export const useProductModel = () => {
  const productApiClient = useProductApiClient();

  const list = async () => {
    const { content } = await productApiClient.list();
    productStore.list(content);
  };

  const read = async (id: string) => {
    return productStore.save(await productApiClient.read(id));
  };

  const create = async (product: Product) => {
    productStore.create(await productApiClient.create(product));
  };

  const update = async (product: Product) => {
    productStore.update(await productApiClient.update(product));
  };

  const remove = async (id: string | undefined) => {
    productStore.remove(id);
  };

  const selectProducts = () => productStore.products;

  return {
    list,
    read,
    create,
    update,
    remove,
    selectProducts,
  };
};
