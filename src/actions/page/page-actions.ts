"use server";

import { getPageByRoute } from "@/lib/mongo/actions/page";
import { IPage } from "@/types/page";
import { HydratedDocument } from "mongoose";

export const getPage = async (route: string) => {
	// what if bad route is passed?
	// what if no return is made
	// what if error is thrown?
	// If error thrown(bad route/unfound page data) we crash...
	const page = await getPageByRoute(route);
	if (!page) {
		throw new Error(`Page not found for route: ${route}`);
	}
	return page as HydratedDocument<IPage>;
};
