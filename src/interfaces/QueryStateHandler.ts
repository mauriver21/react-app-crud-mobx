import type { createQueryStateHandler } from '@/utils/createQueryStateHandler';

export type QueryStateHandler<TEntity> = ReturnType<
  typeof createQueryStateHandler<TEntity>
>;
