export const paginateData = <T = any>(
  data: Array<T>,
  pagination: { page: number; limit: number; pageAsIndex?: boolean },
  options?: { decreasePageWhenDataIsEmpty?: boolean },
) => {
  pagination = { pageAsIndex: true, ...pagination };
  const pageOffset = pagination.pageAsIndex ? 0 : 1;
  const limit = Number(pagination.limit);
  const start = (Number(pagination.page) - pageOffset) * limit;
  const end = start + limit;
  let content = data.slice(start, end);
  let page = pagination.page;

  if (
    options?.decreasePageWhenDataIsEmpty &&
    pagination.page > 0 &&
    content.length === 0
  ) {
    page = pagination.page - 1;
    content = data.slice(start - limit, end - limit);
  }

  return {
    content,
    totalPages: Math.ceil(data.length / limit),
    page,
    limit: pagination.limit,
  };
};
