"use server";

import { getPageByRoute, getPagesByUserId } from "@/lib/mongo/actions/page";
import { initialiseServices } from "@/lib/services/intialise-services";
import { IPage } from "@/types/page";
import { cloneDeep } from "@/utils/object";
import { HydratedDocument } from "mongoose";
import { redirect } from "next/navigation";
import { getUserId } from "../user/get-user";

export const getPage = async (route: string) => {
	await initialiseServices();
	// what if bad route is passed?
	// what if no return is made
	// what if error is thrown?
	// If error thrown(bad route/unfound page data) we crash...
	const page = await getPageByRoute(route);

	// Don't do this here
	if (!page) {
		redirect("/");
	}
	return page as HydratedDocument<IPage>;
};

export const getMetadataForRoute = async (route: string) => {
	await initialiseServices();
	const page = (await getPageByRoute(route)) as HydratedDocument<IPage>;
	if (!page) {
		return {};
	}
	const meta = page.meta;

	return meta;
};

export const getPagesForUser = async (userId: string) => {
	// probably check you are the use?
	const pages = await getPagesByUserId(userId);
	if (!pages) {
		return [];
	}

	return cloneDeep(pages) as HydratedDocument<IPage>[];
};

export const recordPageView = async (route: string, userId?: string) => {
	await initialiseServices();
	const page = (await getPageByRoute(route)) as HydratedDocument<IPage>;
	if (!page) {
		return;
	}
	page.views = page.views || [];
	page.views.push({ timestamp: new Date(), userId });
	await page.save();
};

export const recordPageViewForRoute = async (route: string) => {
	const userId = await getUserId();
	await recordPageView(route, userId || undefined);
};
