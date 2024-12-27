"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { saveOrCreatePageByRoute } from "@/lib/mongo/actions/page";
import { Session } from "@/types/auth/session";
import { IPage } from "@/types/page";
import { getServerSession } from "next-auth";
// import { revalidatePath } from "next/cache";

export async function savePage(route: string, page: IPage) {
	// not the correct way of protecting actions?
	const session = (await getServerSession(options)) as Session;
	if (!session) {
		throw new Error("No session found");
	}

	const { user } = session;
	const { user_id } = user;

	// Check user credentials against page
	// Check data conforms to page/form schema

	await saveOrCreatePageByRoute(page, user_id);

	// revalidate the path?
	// we need to remove the cache for this header call
	// We need to force a reload onl the edit page

	return { message: "Page Saved!" };
}
