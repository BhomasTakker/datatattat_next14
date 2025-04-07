"use server";

import { PATHS } from "@/lib/routing/paths";
import { cloneDeep } from "@/utils/object";
import { HeaderType } from "@/types/header";
import { getHeader } from "@/lib/mongo/actions/header";
import { initialiseServices } from "@/lib/services/intialise-services";

// This was the bug
// THIS is a server action
// IT IS an async function / whether you specify or not
// It will be a promise!
// No need being a server function
export const trimHeader = async (route: string) => {
	const header = route.split("/");
	return header.splice(0, header.length - 1).join("/");
};

// No need being a server function
export const isProtectedRoute = async (route: string) => {
	//This isn't great?
	//missed a thing and got into an infinite loop
	//We CANNOT do this on Vercel!!
	// Could instead count and drop after x iterations to be safe
	return !route || route === PATHS.home() || route === "/users";
};

export async function getMainHeader(): Promise<HeaderType> {
	await initialiseServices();
	const header = await getHeader(PATHS.home());

	return cloneDeep(header);
}

async function populateSubHeaders(route: string): Promise<HeaderType[]> {
	if (await isProtectedRoute(route)) {
		return [];
	}

	await initialiseServices();

	const result = await getHeader(route);
	const header = [result];

	const parentHeader = await trimHeader(route);

	const sub = parentHeader ? await populateSubHeaders(parentHeader) : [];

	return [...header, ...sub] as HeaderType[];
}

export async function getSubHeaders(route: string): Promise<HeaderType[]> {
	await initialiseServices();
	const subHeaders = await populateSubHeaders(route);
	return cloneDeep(subHeaders);
}
