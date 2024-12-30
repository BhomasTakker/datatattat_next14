"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { saveOrCreateHeaderByRoute } from "@/lib/mongo/actions/header";
import { Session } from "@/types/auth/session";
import { getServerSession } from "next-auth";
import { FieldValues } from "react-hook-form";

// import { revalidatePath } from "next/cache";

// This is used with onSubmit Form and react-hook-form
export async function saveHeader(route: string, header: FieldValues) {
	// not the correct way of protecting actions?
	const session = (await getServerSession(options)) as Session;
	if (!session) {
		throw new Error("No session found");
	}

	const { user } = session;
	const { user_id } = user;

	///////////////////////////////////////////////////////////
	// Create a function for this
	// convert received data into the correct structure
	const headerKeys = Object.keys(header);
	const labels = headerKeys.filter((key) => key.includes("label"));
	const routes = headerKeys.filter((key) => key.includes("route"));

	// Again copilot is being a bit too helpful here
	const links = labels.map((label, index) => ({
		label: header[label],
		route: header[routes[index]],
	}));
	///////////////////////////////////////////////////////////

	// save creator we may want to save multiple and last creator..
	// We are assuming there is only one per header/page.
	const result = await saveOrCreateHeaderByRoute(
		{ route, nav: links },
		user_id
	);

	console.log("SAVE HEADER", { result, route, links });

	// revalidate the path?
	// we need to remove the cache for this header call
	// We need to force a reload onl the edit page

	return result;
}
