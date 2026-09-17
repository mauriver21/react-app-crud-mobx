import type { createQueryStateHandler } from '@/utils/createQueryStateHandler';

export type QueryStateHandler<TEntity = unknown> = ReturnType<
  typeof createQueryStateHandler<TEntity>
>;
