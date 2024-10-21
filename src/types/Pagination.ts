export interface Pagination<T> {
  currentPage: number;
  totalPages: number;
  data: T[];
}
