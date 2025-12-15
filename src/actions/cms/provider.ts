"use server";

import {
	appendParams,
	createPaginationParams,
	getRoute,
} from "@/components/cms/utils";
import { ProviderItem } from "@/types/data-structures/collection/item/item";
import { redirect } from "next/navigation";
import { getCMSHeaders } from "./query";

type FetchProviderFormData = {
	name?: string;
	url?: string;
	id?: string;
};

type FetchProvidersQuery = {
	name?: string;
	id?: string;
	url?: string;
	origin?: string;
	leaning?: string;
	minRating?: string | number;
	maxRating?: string | number;
	page?: string;
	limit?: string;
	sortBy?: string;
	sortOrder?: "desc" | "asc";
};

const paramCheck = (param: string | undefined) =>
	param !== undefined && param.length > 0;

const createQueryString = (data: FetchProviderFormData) => {
	let queryString = "";
	switch (true) {
		case paramCheck(data.id):
			queryString = `?id=${data.id}`;
			break;
		case paramCheck(data.url):
			queryString = `?url=${data.url}`;
			break;
		case paramCheck(data.name):
			queryString = `?name=${encodeURIComponent(data.name || "")}`;
			break;
		default:
			queryString = "";
	}
	return queryString;
};

const createProvidersQueryString = (data: FetchProvidersQuery) => {
	let params = createPaginationParams(data, new URLSearchParams());
	params = appendParams(data, params, [
		"name",
		"url",
		"origin",
		"leaning",
		"minRating",
		"maxRating",
		"id",
	]);

	return `?${params.toString()}`;
};

// There should be a base / generic paginated type somewhere
type PaginatedData = {
	data: ProviderItem[];
	pagination: {
		total: number;
		page: number;
		pages: number;
		limit: number;
	};
};

export async function getProviders(data: FetchProvidersQuery) {
	const queryString = createProvidersQueryString(data);

	return fetch(`${getRoute("/articles/providers/search")}${queryString}`, {
		method: "GET",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<PaginatedData>)
		.catch((err) => {
			console.error("Error fetching providers:", err);
			return null;
		});
}

export async function getProvider(data: FetchProviderFormData) {
	const queryString = createQueryString(data);

	return fetch(`${getRoute("/articles/providers/get")}${queryString}`, {
		method: "GET",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<ProviderItem>)
		.catch((err) => {
			console.error("Error fetching provider:", err);
			return null;
		});
}

export async function createProvider(data: Omit<ProviderItem, "_id">) {
	return await fetch(`${getRoute("/articles/providers/create")}`, {
		method: "POST",
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<ProviderItem>)
		.catch((err) => {
			console.error("Error creating provider:", err);
			throw err;
		});
}

export async function updateProvider(data: ProviderItem) {
	const _id = data._id;
	if (!_id) {
		throw new Error("Provider ID is required for update.");
	}

	return await fetch(`${getRoute("/articles/providers/update/")}${_id}`, {
		method: "PUT",
		headers: await getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<ProviderItem>)
		.catch((err) => {
			//create errors etc sounds like a good idea
			console.error("Error updating provider:", err);
			throw err;
		});
}

export async function deleteProvider(id: string) {
	if (!id) {
		throw new Error("Provider ID is required for deletion.");
	}

	return await fetch(`${getRoute("/articles/providers/delete/")}${id}`, {
		method: "DELETE",
		headers: await getCMSHeaders(),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error("Error deleting provider:", err);
			throw err;
		});
}

export async function gotoProvider(
	data: Record<string, unknown> & { _id?: string }
) {
	if (!data._id) {
		return;
	}

	redirect(`/cms/articles/providers/${data._id}`);
}
