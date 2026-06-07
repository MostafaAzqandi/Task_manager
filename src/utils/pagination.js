export function getPagination(page, limit = 10) {
  const currentPage = Math.max(parseInt(page) || 1, 1);

  return {
    limit,
    offset: (currentPage - 1) * limit,
    currentPage,
  };
}
