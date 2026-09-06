import type { Product } from '@/interfaces/Product';
import { makeAutoObservable } from 'mobx';

export class ProductStore {
  products: Product[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  list(products: []) {
    this.products = products;
  }

  read(id: string) {
    return this.products.find((item) => item.id === id);
  }

  create(product: Product) {
    this.products.push(product);
  }

  update(id: string, product: Product) {
    this.products.map((item) => {
      if (item.id === id) {
        return { ...item, ...product };
      }
      return item;
    });
  }

  remove(id: string) {
    this.products.filter((item) => item.id !== id);
  }
}
