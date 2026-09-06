import type { ListResponse } from '@/interfaces/ListResponse';
import type { Product } from '@/interfaces/Product';
import { api } from '@/utils/api';

export const useProductApiClient = () => {
  const list = async () => {
    const { data } = await api.get<ListResponse<Product>>('/products');
    return data;
  };

  const read = async (id: string) => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  };

  const create = async (product: Product) => {
    const { data } = await api.post<Product>(`/products/`, product);
    return data;
  };

  const update = async (product: Product) => {
    const { data } = await api.post<Product>(
      `/products/${product?.id}`,
      product,
    );
    return data;
  };

  const remove = async (id: string) => {
    const { data } = await api.delete<Product>(`/products/${id}`);
    return data;
  };

  return { list, read, create, update, remove };
};
