"use server";

import { getCMSHeaders, getRoute } from "@/components/cms/utils";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { redirect } from "next/navigation";

type FetchArticleFormData = {
	src?: string;
	title?: string;
	id?: string;
};

const paramCheck = (param: string | undefined) =>
	param !== undefined && param.length > 0;

const createQueryString = (data: FetchArticleFormData) => {
	let queryString = "";
	switch (true) {
		case paramCheck(data.id):
			queryString = `?id=${data.id}`;
			break;
		case paramCheck(data.src):
			queryString = `?src=${data.src}`;
			break;
		case paramCheck(data.title):
			// not working - I think  we need to encodeURIComponent somewhere?
			queryString = `?title=${encodeURIComponent(data.title || "")}`;
			break;
		default:
			queryString = "";
	}
	return queryString;
};

type FetchArticlesQuery = {
	title?: string;
	providerId?: string;
	id?: string;
	src?: string;
	page?: string;
	limit?: string;
	sortBy?: string;
	sortOrder?: "desc" | "asc";
};

const createArticlesQueryString = (data: FetchArticlesQuery) => {
	const params = new URLSearchParams();

	if (data.title) params.append("title", data.title);
	if (data.src) params.append("src", data.src);
	if (data.id) params.append("id", data.id);
	if (data.providerId) params.append("provider", data.providerId);

	params.append("page", data.page || "1");
	params.append("limit", data.limit || "10");
	params.append("sortBy", data.sortBy || "createdAt");
	params.append("sortOrder", data.sortOrder || "desc");

	return `?${params.toString()}`;
};

// There should be a base / generic paginated type somewhere
type PaginatedArticlesData = {
	data: CollectionItem[];
	pagination: {
		total: number;
		page: number;
		pages: number;
		limit: number;
	};
};

export async function getArticles(data: FetchArticlesQuery) {
	const queryString = createArticlesQueryString(data);

	return fetch(`${getRoute("/articles/search")}${queryString}`, {
		method: "GET",
		headers: getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<PaginatedArticlesData>)
		.catch((err) => {
			console.error("Error fetching articles:", err);
			return null;
		});
}

// When we get articles
// Older articles may not have all fields populated
// OR may have strings where objects/arrays are expected
// So we need to do some data cleaning here eventually
export async function getArticle(data: FetchArticleFormData) {
	const queryString = createQueryString(data);

	return fetch(`${getRoute("/articles/get")}${queryString}`, {
		method: "GET",
		headers: getCMSHeaders(),
	})
		.then((res) => {
			return res.json() as Promise<CollectionItem>;
		})
		.catch((err) => {
			console.error("Error fetching article:", err);
			return null;
		});
}

export async function updateArticle(data: CollectionItem) {
	const _id = data._id;
	if (!_id) {
		throw new Error("Article ID is required for update.");
	}

	return await fetch(`${getRoute("/articles/update/")}${_id}`, {
		method: "PUT",
		headers: getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<CollectionItem>)
		.catch((err) => {
			//create errors etc sounds like a good idea
			console.error("Error updating article:", err);
			throw err;
		});
}

export async function deleteArticle(id: string) {
	if (!id) {
		throw new Error("Article ID is required for deletion.");
	}

	return await fetch(`${getRoute("/articles/delete/")}${id}`, {
		method: "DELETE",
		headers: getCMSHeaders(),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error("Error deleting article:", err);
			throw err;
		});
}

export async function gotoArticle(
	data: Record<string, unknown> & { _id?: string }
) {
	if (!data._id) {
		return;
	}
	redirect(`/cms/articles/${data._id}`);
}
