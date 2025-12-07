"use server";

import { getCMSHeaders, getRoute } from "@/components/cms/utils";

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
			queryString = `?title=${data.title}`;
			break;
		default:
			queryString = "";
	}
	return queryString;
};

export async function getArticle(data: FetchArticleFormData) {
	const queryString = createQueryString(data);

	return await fetch(`${getRoute("/articles/get")}${queryString}`, {
		method: "GET",
		headers: getCMSHeaders(),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error("Error fetching article:", err);
			return null;
		});
}
