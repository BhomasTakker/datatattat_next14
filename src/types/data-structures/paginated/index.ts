export type Pagination = {
	total: number;
	page: number;
	pages: number;
	limit: number;
};

export type PaginatedData = {
	data: Record<string, unknown>[];
	pagination: Pagination;
};
