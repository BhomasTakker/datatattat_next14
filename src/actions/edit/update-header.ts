"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { saveOrCreateHeaderByRoute } from "@/lib/mongo/actions/header";
import { Session } from "@/types/auth/session";
import { getServerSession } from "next-auth";
import { FieldValues } from "react-hook-form";
import { checkUserAuth } from "../auth/check-user-auth";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import { createLinks } from "@/utils/edit";
import { connectToMongoDB } from "@/lib/mongo/db";

// import { revalidatePath } from "next/cache";

type Links = {
	label: string;
	route: string;
}[];

const save = async (route: string, nav: Links, user_id: string) => {
	await saveOrCreateHeaderByRoute({ route, nav }, user_id);

	return { message: "Header Saved!" };
};

// This is used with onSubmit Form and react-hook-form
export async function saveHeader(route: string, header: FieldValues) {
	try {
		await connectToMongoDB();
		checkUserAuth(route);
	} catch (e) {
		console.error(e);
		redirect(PATHS.error());
	}
	// not the correct way of protecting actions?
	const session = (await getServerSession(options)) as Session;

	const { user } = session;
	const { user_id } = user;

	const links = createLinks(header);

	// we wouldn't revalidate path - but how would we update the header?
	return await save(route, links, user_id);
}
