"use server";

import { ComponentDataFactory } from "@/lib/api/component-data/component-data-factory";
import { ComponentDataOptions } from "@/lib/api/component-data/component-data-options";
import { With } from "@/types/component";

export async function getData(queryObject: With) {
	const { type, query } = queryObject || {};

	if (!queryObject) {
		console.log("No query object provided");
		return {};
	}

	const dataFetcher = ComponentDataFactory(type as ComponentDataOptions);
	if (!dataFetcher) return {};

	const queryData = await dataFetcher(query);

	return queryData;
}
