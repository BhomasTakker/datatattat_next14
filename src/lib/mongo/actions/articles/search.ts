import { buildArticleSearchQuery } from "./query";

export type GetLatestArticlesProps = {
	query?: string;
	// just use sort for now?
	latest?: boolean;
	//match
	provider?: string;
	variant?: string;
	contentType?: string;
	before?: Date;
	after?: Date;
	trustHigher?: boolean;
	trustLower?: boolean;
	leaningHigher?: boolean;
	leaningLower?: boolean;
	region?: string;
	language?: string;
	// sort
	sort?: string;
	// limit
	limit?: number;
	// count? reutn count of articles
};

export const searchArticles = async (params: GetLatestArticlesProps) => {
	const articles = await buildArticleSearchQuery(params);

	return {
		// what other data - paginaton etc
		items: articles,
	};
};
