export interface Pagination {
    currentPage: Number;
    itemsPerPage: Number;
    totalItems: Number;
    totalPages: Number;
    showingItemFrom: number;
    showingItemTo: number;

}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
