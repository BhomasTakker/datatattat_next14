"use server";

import {
	appendParams,
	createPaginationParams,
	getRoute,
} from "@/components/cms/utils";
import { ArticleSourceList } from "@/types/cms/ArticleSourceList";
import { redirect } from "next/navigation";
import { getCMSHeaders } from "./query";

type FetchSourceListFormData = {
	title?: string;
	id?: string;
};

type FetchSourceListsQuery = {
	title?: string;
	id?: string;
	variant?: string;
	categories?: string;
	region?: string;
	coverage?: string;
	language?: string;
	page?: string;
	limit?: string;
	sortBy?: string;
	sortOrder?: "desc" | "asc";
};

const paramCheck = (param: string | undefined) =>
	param !== undefined && param.length > 0;

const createQueryString = (data: FetchSourceListFormData) => {
	let queryString = "";
	switch (true) {
		case paramCheck(data.id):
			queryString = `?id=${data.id}`;
			break;
		case paramCheck(data.title):
			queryString = `?title=${encodeURIComponent(data.title || "")}`;
			break;
		default:
			queryString = "";
	}
	return queryString;
};

const createSourceListsQueryString = (data: FetchSourceListsQuery) => {
	let params = createPaginationParams(data, new URLSearchParams());
	params = appendParams(data, params, [
		"title",
		"variant",
		"categories",
		"region",
		"coverage",
		"language",
	]);

	return `?${params.toString()}`;
};

// There should be a base / generic paginated type somewhere
type PaginatedData = {
	data: ArticleSourceList[];
	pagination: {
		total: number;
		page: number;
		pages: number;
		limit: number;
	};
};

export async function getSourceLists(data: FetchSourceListsQuery) {
	const queryString = createSourceListsQueryString(data);

	return fetch(`${getRoute("/articles/source-lists/search")}${queryString}`, {
		method: "GET",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<PaginatedData>)
		.catch((err) => {
			console.error("Error fetching source lists:", err);
			return null;
		});
}

export async function getSourceList(data: FetchSourceListFormData) {
	const queryString = createQueryString(data);

	return fetch(`${getRoute("/articles/source-lists/get")}${queryString}`, {
		method: "GET",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<ArticleSourceList>)
		.catch((err) => {
			console.error("Error fetching source list:", err);
			return null;
		});
}
export async function createSourceList(data: ArticleSourceList) {
	return await fetch(`${getRoute("/articles/source-lists/create")}`, {
		method: "POST",
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<ArticleSourceList>)
		.catch((err) => {
			//create errors etc sounds like a good idea
			console.error("Error creating source list:", err);
			throw err;
		});
}
export async function updateSourceList(
	data: ArticleSourceList & { _id?: string }
) {
	const _id = data._id;
	if (!_id) {
		throw new Error("Source List ID is required for update.");
	}

	return await fetch(`${getRoute("/articles/source-lists/update/")}${_id}`, {
		method: "PUT",
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<ArticleSourceList>)
		.catch((err) => {
			//create errors etc sounds like a good idea
			console.error("Error updating source list:", err);
			throw err;
		});
}

export async function deleteSourceList(id: string) {
	if (!id) {
		throw new Error("Source List ID is required for deletion.");
	}

	return await fetch(`${getRoute("/articles/source-lists/delete/")}${id}`, {
		method: "DELETE",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error("Error deleting source list:", err);
			throw err;
		});
}

export async function gotoSourceList(
	data: Record<string, unknown> & { _id?: string }
) {
	if (!data._id) {
		return;
	}

	redirect(`/cms/articles/source-lists/${data._id}`);
}
