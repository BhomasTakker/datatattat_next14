"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import {
	createNewPageByRoute,
	deletePageByRoute,
	saveOrCreatePageByRoute,
} from "@/lib/mongo/actions/page";
import { Session } from "@/types/auth/session";
import { IPage } from "@/types/page";
import { getServerSession } from "next-auth";
import { checkUserAuth } from "../auth/check-user-auth";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import { connectToMongoDB } from "@/lib/mongo/db";
import { cloneDeep } from "@/utils/object";
import { saveOrCreateTemplateByKey } from "@/lib/mongo/actions/user/user-templates";

const save = async (page: IPage, id: string) => {
	await connectToMongoDB();
	await saveOrCreatePageByRoute(page, id);

	return { message: "Page Saved!" };
};

// can technically get route from page
export async function savePage(route: string, page: IPage) {
	// find a bettr way
	await connectToMongoDB();

	try {
		checkUserAuth(route);
	} catch (e) {
		console.error(e);
		redirect(PATHS.error());
	}

	const session = (await getServerSession(options)) as Session;

	const { user } = session;
	const { user_id } = user;

	return await save(page, user_id);
}

// we will save user templates to the user object
export async function saveTemplate(name: string, page: IPage) {
	// find a bettr way
	await connectToMongoDB();

	const session = (await getServerSession(options)) as Session;

	const { user } = session;
	const { user_id } = user;
	//return await saveOrCreatePageByRoute(page, user_id);
	return await saveOrCreateTemplateByKey(name, page, user_id);
}

export const createPageByRoute = async (route: string) => {
	await connectToMongoDB();

	try {
		checkUserAuth(route);
	} catch (e) {
		console.error(e);
		redirect(PATHS.error());
	}

	const session = (await getServerSession(options)) as Session;

	const { user } = session;
	const { user_id } = user;

	const res = await createNewPageByRoute(route, user_id);
	return res;
};

// we should definitely check userId here
export const deleteByRoute = async (route: string) => {
	await connectToMongoDB();

	try {
		checkUserAuth(route);
	} catch (e) {
		console.error(e);
		redirect(PATHS.error());
	}
	const res = await deletePageByRoute(route);
	return cloneDeep(res);
};
