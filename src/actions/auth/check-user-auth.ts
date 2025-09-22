"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getUserById } from "@/lib/mongo/actions/user/user";
import { PATHS } from "@/lib/routing/paths";
import { initialiseServices } from "@/lib/services/intialise-services";
import { Session } from "@/types/auth/session";
import { getServerSession } from "next-auth";

const checkUserAuthorized = async (username: string, route: string) => {
	const userHome = PATHS.user(username);

	if (route === userHome) {
		return;
	}

	// to get around partial matches ie JimSmith matching JimSmith2
	// We need to match the whole route OR the whole name + "/"
	if (!route.startsWith(`${userHome}/`)) {
		// log and redirect
		throw new Error("Unauthorized");
	}
};

const checkAdminAuthorized = async (role: string) => {
	if (role !== "admin") {
		throw new Error("Unauthorized");
	}
};

export const checkUserAuth = async (route: string) => {
	// check if user is logged in
	const session = (await getServerSession(options)) as Session;
	if (!session) {
		throw new Error("No session found");
	}
	await initialiseServices();

	const { user } = session;
	const { user_id } = user;

	const { username, role } = await getUserById(user_id);

	const isUserPage = route.startsWith(PATHS.users());

	////////////////////////////////////////////
	// check if user is editing their own page
	////////////////////////////////////////////
	// wrap in a try ctch redirect to 404
	////////////////////////////////////////////
	if (isUserPage) {
		await checkUserAuthorized(username, route);
	} else {
		await checkAdminAuthorized(role);
	}
};
