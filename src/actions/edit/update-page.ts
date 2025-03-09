"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { saveOrCreatePageByRoute } from "@/lib/mongo/actions/page";
import { Session } from "@/types/auth/session";
import { IPage } from "@/types/page";
import { getServerSession } from "next-auth";
import { checkUserAuth } from "../auth/check-user-auth";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import { connectToMongoDB } from "@/lib/mongo/db";

const save = async (page: IPage, id: string) => {
	await saveOrCreatePageByRoute(page, id);

	return { message: "Page Saved!" };
};

// can technically get route from page
export async function savePage(route: string, page: IPage) {
	try {
		checkUserAuth(route);
	} catch (e) {
		console.error(e);
		redirect(PATHS.error());
	}
	// find a bettr way
	await connectToMongoDB();

	const session = (await getServerSession(options)) as Session;

	const { user } = session;
	const { user_id } = user;

	return await save(page, user_id);
}
