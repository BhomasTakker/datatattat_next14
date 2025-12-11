"use server";

import { getCMSHeaders, getRoute } from "@/components/cms/utils";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

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
			queryString = `?title=${data.title}`;
			break;
		default:
			queryString = "";
	}
	return queryString;
};

export async function getArticle(data: FetchArticleFormData) {
	const queryString = createQueryString(data);

	return fetch(`${getRoute("/articles/get")}${queryString}`, {
		method: "GET",
		headers: getCMSHeaders(),
	})
		.then((res) => res.json() as Promise<CollectionItem>)
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
