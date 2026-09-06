import { delay, http, HttpResponse } from 'msw';
import type { Product } from '@/interfaces/Product';
import { data } from '@/mocks/data';
import { ENV } from '@/constants/env';

export const productHandler = [
  // List
  http.get(`${ENV.API_BASE_URL}/products`, async ({ request }) => {
    await delay(650);
    const products = data.products;
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
    const size = Math.max(1, Number(url.searchParams.get('size') ?? 20));

    return HttpResponse.json({
      content: data.products,
      pagination: {
        page,
        size,
        totalElements: products.length,
        totalPages: Math.max(1, Math.ceil(products.length / size)),
      },
    });
  }),
  // Read
  http.get(`${ENV.API_BASE_URL}/products/:id`, ({ params }) => {
    const product = data.products.find(({ id }) => id === params.id);
    return product
      ? HttpResponse.json({ data: product })
      : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),
  // Create
  http.post(`${ENV.API_BASE_URL}/products`, async ({ request }) => {
    const product = (await request.json()) as Product;
    data.products = [...data.products, product];
    return HttpResponse.json({ data: product }, { status: 201 });
  }),
  // Update
  http.put(`${ENV.API_BASE_URL}/products/:id`, async ({ params, request }) => {
    const input = (await request.json()) as Product;
    const current = data.products.find(({ id }) => id === params.id);
    if (!current)
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const product: Product = {
      ...current,
      ...input,
    };
    data.products = data.products.map((item) =>
      item.id === current.id ? product : item,
    );
    return HttpResponse.json({ data: product });
  }),
  // Remove
  http.delete(`${ENV.API_BASE_URL}/products/:id`, ({ params }) => {
    const product = data.products.find(({ id }) => id === params.id);
    if (!product)
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    data.products = data.products.filter(({ id }) => id !== params.id);
    return HttpResponse.json({ data: product });
  }),
];
