import { ProductForm } from '@/components/ProductForm';
import { ProductsList } from '@/components/ProductsList';
import { MainLayout } from '@/layouts/MainLayout';
import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <ProductsList /> },
      { path: 'products', element: <ProductsList /> },
      { path: 'products/create', element: <ProductForm /> },
      { path: 'products/:id/edit', element: <ProductForm /> },
    ],
  },
];
