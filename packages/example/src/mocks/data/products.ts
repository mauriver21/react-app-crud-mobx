import type { Product } from '@/interfaces/Product';
import { faker } from '@/utils/faker';

export const products: Product[] = Array.from(
  { length: 100 },
  (): Product => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.number.float({
      min: 1,
      max: 1000,
      fractionDigits: 2,
    }),
  }),
);
