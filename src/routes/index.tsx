import { ProductsList } from '@/components/ProductsList';
import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [{ path: '/', element: <ProductsList /> }];
