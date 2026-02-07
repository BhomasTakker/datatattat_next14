"use server";

import {
	appendParams,
	createPaginationParams,
	getRoute,
} from "@/components/cms/utils";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { redirect } from "next/navigation";
import { getCMSHeaders } from "./query";

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
	sourceId?: string;
	id?: string;
	src?: string;
	page?: string;
	limit?: string;
	sortBy?: string;
	sortOrder?: "desc" | "asc";
};

const createArticlesQueryString = (data: FetchArticlesQuery) => {
	let params = createPaginationParams(data, new URLSearchParams());
	params = appendParams(
		{ ...data, provider: data.providerId, feed: data.sourceId },
		params,
		["title", "src", "id", "provider", "feed"],
	);

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
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<PaginatedArticlesData>)
		.catch((err) => {
			console.error("Error fetching articles:", err);
			return null;
		});
}

export async function getArticle(data: FetchArticleFormData) {
	const queryString = createQueryString(data);

	return fetch(`${getRoute("/articles/get")}${queryString}`, {
		method: "GET",
		headers: await getCMSHeaders(),
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
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<CollectionItem>)
		.catch((err) => {
			//create errors etc sounds like a good idea
			console.error("Error updating article:", err);
			throw err;
		});
}

export async function createArticle(data: Omit<CollectionItem, "_id">) {
	///////////////////////////////
	// Add utils etc
	// Basic validation
	if (!data.title || data.title.trim().length === 0) {
		throw new Error("Article title is required.");
	}

	if (!data.src || data.src.trim().length === 0) {
		throw new Error("Article source URL is required.");
	}

	// Validate src URL format
	try {
		new URL(data.src);
	} catch {
		throw new Error("Article source URL must be a valid URL.");
	}

	if (!data.provider) {
		throw new Error("Article provider is required.");
	}
	/////////////////////////////////////////

	// We arethrowing an error on a 400 say AND resolving toast successful!
	return await fetch(`${getRoute("/articles/create")}`, {
		method: "POST",
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then(async (res) => {
			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || `HTTP error ${res.status}`);
			}

			return res.json() as Promise<CollectionItem>;
		})
		.catch((err) => {
			console.error("Error creating article:", err);
			throw err;
		});
}

export async function deleteArticle(id: string) {
	if (!id) {
		throw new Error("Article ID is required for deletion.");
	}

	return await fetch(`${getRoute("/articles/delete/")}${id}`, {
		method: "DELETE",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error("Error deleting article:", err);
			throw err;
		});
}

export async function gotoArticle(
	data: Record<string, unknown> & { _id?: string },
) {
	if (!data._id) {
		return;
	}
	redirect(`/cms/articles/${data._id}`);
}
