"use server";

import {
	appendParams,
	createPaginationParams,
	getRoute,
} from "@/components/cms/utils";
import { IPage } from "@/types/page";
import { getCMSHeaders } from "./query";
import { redirect } from "next/navigation";

type PaginatedPagesData = {
	data: Omit<IPage, "content">[];
	pagination: {
		total: number;
		page: number;
		pages: number;
		limit: number;
	};
};

type FetchPagesQuery = {
	_id?: string;
	name?: string;
	enabled?: boolean;
	id?: string;
	page?: string;
	limit?: string;
	sortBy?: string;
	sortOrder?: "desc" | "asc";
};

const createPagesQueryString = (data: FetchPagesQuery) => {
	let params = createPaginationParams(data, new URLSearchParams());
	params = appendParams(data, params, ["name", "id", "_id", "enabled"]);

	return `?${params.toString()}`;
};

export const getPages = async (data: FetchPagesQuery) => {
	const queryString = createPagesQueryString(data);

	const response = await fetch(`${getRoute("/pages/search")}${queryString}`, {
		method: "GET",
		headers: await getCMSHeaders(),
	})
		.then((res) => {
			if (!res.ok) {
				console.error(
					`Error fetching pages: ${res.status} ${res.statusText} — ${getRoute("/pages/search")}${queryString}`,
				);
				return null;
			}
			return res.json() as Promise<PaginatedPagesData>;
		})
		.catch((err) => {
			console.error("Error fetching pages:", err);
			return null;
		});
	return response;
};

type FetchPageFormData = {
	_id?: string;
	id?: string;
};

export const getPage = async (data: FetchPageFormData) => {
	const queryString = createPagesQueryString(data);

	return fetch(`${getRoute("/pages/get")}${queryString}`, {
		method: "GET",
		headers: await getCMSHeaders(),
	})
		.then((res) => {
			return res.json() as Promise<IPage & { _id: string }>;
		})
		.catch((err) => {
			console.error("Error fetching page:", err);
			return null;
		});
};

export async function gotoPage(
	data: Record<string, unknown> & { _id?: string },
) {
	if (!data._id) {
		return;
	}
	redirect(`/cms/pages/${data._id}`);
}

export async function updatePage(data: IPage & { _id?: string }) {
	const _id = data._id;
	if (!_id) {
		throw new Error("Page ID is required for update.");
	}

	return await fetch(`${getRoute("/pages/update/")}${_id}`, {
		method: "PUT",
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<IPage>)
		.catch((err) => {
			console.error("Error updating page:", err);
			throw err;
		});
}

export async function syncPageArticle(data: IPage & { _id?: string }) {
	const _id = data._id;
	if (!_id) {
		throw new Error("Page ID is required for syncing article.");
	}
	return await fetch(`${getRoute("/articles/pages/sync-article/")}`, {
		method: "POST",
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<IPage>)
		.catch((err) => {
			console.error("Error syncing page article:", err);
			throw err;
		});
}
