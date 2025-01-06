"use server";

import { getPageByRoute } from "@/lib/mongo/actions/page";
import { IPage } from "@/types/page";
import { HydratedDocument } from "mongoose";
import { redirect } from "next/navigation";

export const getPage = async (route: string) => {
	// what if bad route is passed?
	// what if no return is made
	// what if error is thrown?
	// If error thrown(bad route/unfound page data) we crash...
	const page = await getPageByRoute(route);
	if (!page) {
		// error page & log?
		redirect("/");
	}
	return page as HydratedDocument<IPage>;
};
