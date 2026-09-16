import type { Product } from '@/interfaces/Product';

export type ProductFilters = Pick<Product, 'name' | 'price'>;
