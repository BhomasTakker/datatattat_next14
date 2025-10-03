"use server";

import { connectToMongoDB } from "@/lib/mongo/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IPage } from "@/types/page";
import { Session } from "@/types/auth/session";
import {
	getTemplateByKey,
	saveOrCreateTemplateByKey,
} from "@/lib/mongo/actions/user/user-templates";
import { getUserFromSessionId } from "../user/get-user";

// Page Template Actions
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

export async function loadTemplate(name: string) {
	await connectToMongoDB();

	const session = (await getServerSession(options)) as Session;

	const { user } = session;
	const { user_id } = user;

	return await getTemplateByKey(name, user_id);
}

export async function getUserTemplates() {
	await connectToMongoDB();

	// get the actual user should be a function itself
	const session = (await getServerSession(options)) as Session;
	const { user } = session;
	const { user_id } = user;
	const iuser = await getUserFromSessionId(user_id);

	return iuser.templates || {};
}

export async function checkTemplateNameUnique(name: string) {
	const templates = await getUserTemplates();
	return !templates.pages?.[name];
}

export async function checkComponentTemplateNameUnique(name: string) {
	const templates = await getUserTemplates();
	return !templates.components?.[name];
}
