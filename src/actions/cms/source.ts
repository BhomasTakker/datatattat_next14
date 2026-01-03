"use server";

import {
	appendParams,
	createPaginationParams,
	getRoute,
} from "@/components/cms/utils";
import { ArticleSource } from "@/types/cms/ArticleSource";
import { redirect } from "next/navigation";
import { getCMSHeaders } from "./query";

type FetchSourceFormData = {
	name?: string;
	src?: string;
	id?: string;
};

type FetchSourcesQuery = {
	name?: string;
	id?: string;
	src?: string;
	variant?: string;
	categories?: string;
	region?: string;
	coverage?: string;
	language?: string;
	source?: string;
	mediaType?: string;
	page?: string;
	limit?: string;
	sortBy?: string;
	sortOrder?: "desc" | "asc";
};

const paramCheck = (param: string | undefined) =>
	param !== undefined && param.length > 0;

const createQueryString = (data: FetchSourceFormData) => {
	let queryString = "";
	switch (true) {
		case paramCheck(data.id):
			queryString = `?id=${data.id}`;
			break;
		case paramCheck(data.src):
			queryString = `?src=${encodeURIComponent(data.src || "")}`;
			break;
		case paramCheck(data.name):
			queryString = `?name=${encodeURIComponent(data.name || "")}`;
			break;
		default:
			queryString = "";
	}
	return queryString;
};

const createSourcesQueryString = (data: FetchSourcesQuery) => {
	let params = createPaginationParams(data, new URLSearchParams());
	params = appendParams(data, params, [
		"name",
		"src",
		"variant",
		"categories",
		"region",
		"coverage",
		"language",
		"source",
		"mediaType",
	]);

	return `?${params.toString()}`;
};

// There should be a base / generic paginated type somewhere
type PaginatedData = {
	data: ArticleSource[];
	pagination: {
		total: number;
		page: number;
		pages: number;
		limit: number;
	};
};

export async function getSources(data: FetchSourcesQuery) {
	const queryString = createSourcesQueryString(data);

	return fetch(`${getRoute("/articles/sources/search")}${queryString}`, {
		method: "GET",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<PaginatedData>)
		.catch((err) => {
			console.error("Error fetching sources:", err);
			return null;
		});
}

export async function getSource(data: FetchSourceFormData) {
	const queryString = createQueryString(data);

	return fetch(`${getRoute("/articles/sources/get")}${queryString}`, {
		method: "GET",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<ArticleSource>)
		.catch((err) => {
			console.error("Error fetching source:", err);
			return null;
		});
}

export async function createSource(data: Omit<ArticleSource, "_id">) {
	// Basic validation
	if (!data.name || data.name.trim().length === 0) {
		throw new Error("Source name is required.");
	}

	if (!data.src || data.src.trim().length === 0) {
		throw new Error("Source src is required.");
	}

	// Validate src URL format
	try {
		new URL(data.src);
	} catch {
		throw new Error("Source src must be a valid URL.");
	}

	return await fetch(`${getRoute("/articles/sources/create")}`, {
		method: "POST",
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then(async (res) => {
			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.message || `HTTP error ${res.status}`);
			}

			return res.json() as Promise<ArticleSource>;
		})
		.catch((err) => {
			console.error("Error creating source:", err);
			throw err;
		});
}

export async function updateSource(data: ArticleSource & { _id?: string }) {
	const _id = data._id;
	if (!_id) {
		throw new Error("Source ID is required for update.");
	}

	return await fetch(`${getRoute("/articles/sources/update/")}${_id}`, {
		method: "PUT",
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<ArticleSource>)
		.catch((err) => {
			//create errors etc sounds like a good idea
			console.error("Error updating source:", err);
			throw err;
		});
}

export async function deleteSource(id: string) {
	if (!id) {
		throw new Error("Source ID is required for deletion.");
	}

	return await fetch(`${getRoute("/articles/sources/delete/")}${id}`, {
		method: "DELETE",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error("Error deleting source:", err);
			throw err;
		});
}

export async function gotoSource(
	data: Record<string, unknown> & { _id?: string }
) {
	if (!data._id) {
		return;
	}

	redirect(`/cms/articles/source/${data._id}`);
}
