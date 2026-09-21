import type { Product } from '@/interfaces/Product';
import type { Id, ListParams, PaginatedList } from 'use-mobx-model';
import { api } from '@/utils/api';

export const useProductApiClient = () => {
  const list = async (params: ListParams) => {
    const { data } = await api.get<PaginatedList<Product>>('/products', {
      params: { ...params.pagination },
    });
    return data;
  };

  const read = async (id: Id) => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  };

  const create = async (product: Product) => {
    const { data } = await api.post<Product>(`/products/`, product);
    return data;
  };

  const update = async (product: Product) => {
    const { data } = await api.put<Product>(
      `/products/${product?.id}`,
      product,
    );
    return data;
  };

  const remove = async (id: Id) => {
    const { data } = await api.delete<Product>(`/products/${id}`);
    return data;
  };

  return { list, read, create, update, remove };
};
