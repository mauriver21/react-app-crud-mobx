import type { PaginatedList } from '@/interfaces/PaginatedList';
import type { QueryFlags } from './QueryFlags';

export type SelectedQuery<TEntity> = PaginatedList<TEntity> & QueryFlags;
