import type { Query } from '@/interfaces/Query';

export interface QueryState<T = unknown> {
  queries: Query[];
  byId: Record<string, T>;
}
