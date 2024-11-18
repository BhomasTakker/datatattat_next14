"use server";

import { ComponentDataFactory } from "@/lib/api/component-data/component-data-factory";
import { ComponentDataOptions } from "@/lib/api/component-data/component-data-map";
import { With } from "@/types/page";

export async function getData(queryObject: With) {
	const { type, query } = queryObject;

	const dataFetcher = ComponentDataFactory(type as ComponentDataOptions);
	if (!dataFetcher) return {};

	const queryData = await dataFetcher(query);

	return queryData;
}
