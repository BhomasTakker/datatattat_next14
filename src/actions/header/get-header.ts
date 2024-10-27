"use server";

import { PATHS } from "@/lib/routing/paths";
import { cloneDeep } from "@/utils/object";
import { HeaderType } from "@/types/header";
import { getHeader } from "@/lib/mongo/actions/header";

export const trimHeader = (route: string) => {
	const header = route.split("/");
	return header.splice(0, header.length - 1).join("/");
};

export const isProtectedRoute = (route: string) => {
	//This isn't great?
	//missed a thing and got into an infinite loop
	//We CANNOT do this on Vercel!!
	// Could instead count and drop after x iterations to be safe
	return !route || route === PATHS.home() || route === "/users";
};

export async function getMainHeader(): Promise<HeaderType> {
	const header = await getHeader(PATHS.home());

	return cloneDeep(header);
}

async function populateSubHeaders(route: string): Promise<HeaderType[]> {
	if (isProtectedRoute(route)) {
		return [];
	}

	const result = await getHeader(route);
	const header = [result];

	const parentHeader = trimHeader(route);

	const sub = parentHeader ? await populateSubHeaders(parentHeader) : [];

	return [...header, ...sub] as HeaderType[];
}

export async function getSubHeaders(route: string): Promise<HeaderType[]> {
	const subHeaders = await populateSubHeaders(route);
	return cloneDeep(subHeaders);
}
