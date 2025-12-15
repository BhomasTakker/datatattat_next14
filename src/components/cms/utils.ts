const CMS_ROUTE = process.env.CMS_ROUTE || "";

export const getRoute = (url: string = "") => CMS_ROUTE + url;

type PaginationQuery = {
	page?: string;
	limit?: string;
	sortBy?: string;
	sortOrder?: "desc" | "asc";
};

export const createPaginationParams = (
	query: PaginationQuery,
	params: URLSearchParams
) => {
	params.append("page", query.page || "1");
	params.append("limit", query.limit || "10");
	params.append("sortBy", query.sortBy || "createdAt");
	params.append("sortOrder", query.sortOrder || "desc");

	return params;
};

export const appendParams = (
	query: Record<string, unknown>,
	params: URLSearchParams,
	includes: string[]
) => {
	for (const key of includes) {
		const value = (query as any)[key];
		if (value !== undefined) {
			params.append(key, String(value));
		}
	}
	return params;
};
