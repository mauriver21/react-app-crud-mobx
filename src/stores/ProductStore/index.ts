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

  save(product: Product) {
    if (this.products.some((item) => item.id === product.id)) {
      this.update(product);
    }
  }

  create(product: Product) {
    this.products.push(product);
  }

  update(product: Product) {
    this.products.map((item) => {
      if (item.id === product.id) {
        return { ...item, ...product };
      }
      return item;
    });
  }

  remove(id: string | undefined) {
    this.products.filter((item) => item.id !== id);
  }
}
