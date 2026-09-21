import type { Product } from '@/interfaces/Product';

export type ProductFormValues = Omit<Product, 'id'>;
