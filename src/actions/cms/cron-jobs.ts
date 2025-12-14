"use server";

import {
	appendParams,
	createPaginationParams,
	getCMSHeaders,
	getRoute,
} from "@/components/cms/utils";
import { GenericCronConfig } from "@/types/cms/Cron";
import { redirect } from "next/navigation";

type FetchCronJobFormData = {
	_id?: string;
	id?: string;
	name?: string;
	enabled?: boolean;
};

const paramCheck = (param: string | boolean | undefined) =>
	param !== undefined && (typeof param === "boolean" || param.length > 0);

const createQueryString = (data: FetchCronJobFormData) => {
	let queryString = "";
	switch (true) {
		case paramCheck(data._id):
			queryString = `?_id=${data._id}`;
			break;
		case paramCheck(data.id):
			queryString = `?id=${data.id}`;
			break;
		case paramCheck(data.name):
			queryString = `?name=${encodeURIComponent(data.name || "")}`;
			break;
		case data.enabled !== undefined:
			queryString = `?enabled=${data.enabled}`;
			break;
		default:
			queryString = "";
	}
	return queryString;
};

type FetchCronJobsQuery = {
	_id?: string;
	name?: string;
	enabled?: boolean;
	id?: string;
	page?: string;
	limit?: string;
	sortBy?: string;
	sortOrder?: "desc" | "asc";
};

const createCronJobsQueryString = (data: FetchCronJobsQuery) => {
	let params = createPaginationParams(data, new URLSearchParams());
	params = appendParams(data, params, ["name", "id", "_id", "enabled"]);

	return `?${params.toString()}`;
};

type PaginatedCronJobsData = {
	data: GenericCronConfig[];
	pagination: {
		total: number;
		page: number;
		pages: number;
		limit: number;
	};
};

export async function getCronJobs(data: FetchCronJobsQuery) {
	const queryString = createCronJobsQueryString(data);

	return fetch(`${getRoute("/cron/search")}${queryString}`, {
		method: "GET",
		headers: getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<PaginatedCronJobsData>)
		.catch((err) => {
			console.error("Error fetching cron jobs:", err);
			return null;
		});
}

export async function getCronJob(data: FetchCronJobFormData) {
	const queryString = createQueryString(data);

	return fetch(`${getRoute("/cron/get")}${queryString}`, {
		method: "GET",
		headers: getCMSHeaders(),
	})
		.then((res) => {
			return res.json() as Promise<GenericCronConfig>;
		})
		.catch((err) => {
			console.error("Error fetching cron job:", err);
			return null;
		});
}

export async function createCronJob(data: Omit<GenericCronConfig, "_id">) {
	if (!data.id || !data.type) {
		throw new Error("ID and type are required for creating a cron job.");
	}

	return await fetch(`${getRoute("/cron/create")}`, {
		method: "POST",
		headers: getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<GenericCronConfig>)
		.catch((err) => {
			console.error("Error creating cron job:", err);
			throw err;
		});
}

export async function updateCronJob(data: GenericCronConfig) {
	const _id = data._id;
	if (!_id) {
		throw new Error("Cron job ID is required for update.");
	}

	return await fetch(`${getRoute("/cron/update/")}${_id}`, {
		method: "PUT",
		headers: getCMSHeaders(),
		body: JSON.stringify(data),
	})
		.then((res) => res.json() as Promise<GenericCronConfig>)
		.catch((err) => {
			console.error("Error updating cron job:", err);
			throw err;
		});
}

export async function deleteCronJob(id: string) {
	if (!id) {
		throw new Error("Cron job ID is required for deletion.");
	}

	return await fetch(`${getRoute("/cron/delete/")}${id}`, {
		method: "DELETE",
		headers: getCMSHeaders(),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error("Error deleting cron job:", err);
			throw err;
		});
}

export async function gotoCronJob(
	data: Record<string, unknown> & { _id?: string }
) {
	if (!data._id) {
		return;
	}
	redirect(`/cms/cron/${data._id}`);
}
