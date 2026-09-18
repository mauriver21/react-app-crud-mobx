import type { ListQueryParams } from '@/interfaces/ListQueryParams';
import type { QueryState } from '@/interfaces/QueryState';
import { saveById } from '../saveById';

export const updateQueryState = <T>(args: {
  queryState: QueryState<T>;
  params: ListQueryParams<T>;
}) => {
  saveById({ byId: args.queryState.byId });
};
