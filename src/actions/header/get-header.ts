"use server";

import { PATHS } from "@/lib/routing/paths";
import Header from "@/models/Header";
import { cloneDeep } from "@/utils/object";
import { HeaderType } from "@/types/header";

const EMPTY_HEADER: HeaderType = {
	route: "",
	nav: [],
};

const trimHeader = (route: string) => {
	const header = route.split("/");
	return header.splice(0, -1);
};

const isProtectedRoute = (route: string) => {
	//This isn't great?
	//missed a thing and got into an infinite loop
	//We CANNOT do this on Vercel!!
	// Could instead count and drop after x iterations to be safe
	return !route || route === PATHS.home() || route === "/users";
};

export async function getMainHeader(): Promise<HeaderType> {
	const header =
		(await Header.findOne({ route: PATHS.home() }).lean()) || EMPTY_HEADER;

	return cloneDeep(header);
}

async function populateSubHeaders(route: string): Promise<HeaderType[]> {
	if (isProtectedRoute(route)) {
		return [];
	}

	const result = (await Header.findOne({ route }).lean()) || EMPTY_HEADER;
	const header = [result];

	const parentHeader = trimHeader(route);

	const sub = parentHeader
		? await populateSubHeaders(parentHeader.join("/"))
		: [];

	return [...header, ...sub] as HeaderType[];
}

export async function getSubHeaders(route: string): Promise<HeaderType[]> {
	const subHeaders = await populateSubHeaders(route);
	return cloneDeep(subHeaders);
}
