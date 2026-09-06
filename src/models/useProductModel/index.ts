import { useProductApiClient } from '@/apiClients/useProductApiClient';
import type { Product } from '@/interfaces/Product';
import { ProductStore } from '@/stores/ProductStore';
import { useMemo } from 'react';

export const useProductModel = () => {
  const productStore = useMemo(() => new ProductStore(), []);
  const productApiClient = useProductApiClient();

  const list = async () => {
    const { content } = await productApiClient.list();
    productStore.products = content;
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

  return { list, read, create, update, remove };
};
