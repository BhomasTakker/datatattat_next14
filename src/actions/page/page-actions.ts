"use server";

import {
	getPageByRoute,
	getPageDocumentByRoute,
	getPagesByUserId,
} from "@/lib/mongo/actions/page";
import { initialiseServices } from "@/lib/services/intialise-services";
import { IPage } from "@/types/page";
import { cloneDeep } from "@/utils/object";
import { HydratedDocument } from "mongoose";
import { redirect } from "next/navigation";
import { getUserId } from "../user/get-user";
import { recordContentViewAllWindows } from "@/lib/mongo/actions/content-views";
import Page from "@/models/Page";
import { getArticleDocumentByGuid } from "@/lib/mongo/actions/article";
import Article from "@/models/Article";

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
	const page = await getPageByRoute(route);
	if (!page) return;
	await Page.updateOne({ _id: page._id }, { $inc: { totalViewCount: 1 } });

	const pageArticle = (await getArticleDocumentByGuid(
		page._id.toString(),
	)) as HydratedDocument<any>;

	if (pageArticle) {
		await Article.updateOne(
			{ _id: pageArticle._id },
			{ $inc: { "metadata.views.total": 1 } },
		);

		await pageArticle.save();

		await recordContentViewAllWindows(pageArticle._id, userId);
	}

	await recordContentViewAllWindows(page._id, userId);
};

export const recordPageViewForRoute = async (route: string) => {
	const userId = await getUserId();
	await recordPageView(route, userId || undefined);
};
