import { delay, http, HttpResponse } from 'msw';
import type { Product } from '@/interfaces/Product';
import { data } from '@/mocks/data';
import { ENV } from '@/constants/env';
import { faker } from '@/utils/faker';
import { paginateData } from 'use-mobx-model';

export const productHandler = [
  // List
  http.get(`${ENV.API_BASE_URL}/products`, async ({ request }) => {
    await delay(650);
    const products = data.products;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));

    const { content, totalPages } = paginateData(products, {
      limit: size,
      page,
    });

    return HttpResponse.json({
      content,
      pagination: {
        page,
        size,
        totalElements: products.length,
        totalPages,
      },
    });
  }),
  // Read
  http.get(`${ENV.API_BASE_URL}/products/:id`, async ({ params }) => {
    await delay(650);
    const product = data.products.find(({ id }) => id === params.id);

    return product
      ? HttpResponse.json(product)
      : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),
  // Create
  http.post(`${ENV.API_BASE_URL}/products`, async ({ request }) => {
    await delay(650);
    const input = (await request.json()) as Omit<Product, 'id'>;
    const product: Product = { ...input, id: faker.string.uuid() };
    data.products = [...data.products, product];
    return HttpResponse.json(product, { status: 201 });
  }),
  // Update
  http.put(`${ENV.API_BASE_URL}/products/:id`, async ({ params, request }) => {
    await delay(650);
    const input = (await request.json()) as Product;
    const current = data.products.find(({ id }) => id === params.id);
    if (!current)
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const product: Product = { ...current, ...input };
    data.products = data.products.map((item) =>
      item.id === current.id ? product : item,
    );
    return HttpResponse.json(product);
  }),
  // Remove
  http.delete(`${ENV.API_BASE_URL}/products/:id`, async ({ params }) => {
    await delay(650);
    const product = data.products.find(({ id }) => id === params.id);
    if (!product)
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    data.products = data.products.filter(({ id }) => id !== params.id);
    return HttpResponse.json(product);
  }),
];
