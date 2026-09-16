import type { Query } from '@/interfaces/Query';

export interface QueryState<T> {
  queries: Query[];
  byId: Record<string, T>;
}
