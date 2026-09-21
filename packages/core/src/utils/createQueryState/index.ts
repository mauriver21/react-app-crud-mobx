import { observable } from 'mobx';
import type { QueryState } from '@/interfaces/QueryState';

export const createQueryState = <T = unknown>(): QueryState<T> => ({
  queries: [],
  byId: observable.map<string, T>(),
});
