"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getUserById } from "@/lib/mongo/actions/user";
import { initialiseServices } from "@/lib/services/intialise-services";
import { Session } from "@/types/auth/session";
import { IUser } from "@/types/user";
import { getServerSession } from "next-auth";

export async function getSessionUser() {
	const session = (await getServerSession(options)) as Session;
	if (!session) {
		// throw new Error("No session found");
		return null;
	}

	return session.user;
}

export async function getUserFromSessionId(id: string): Promise<IUser> {
	await initialiseServices();
	const user = await getUserById(id);

	if (!user) {
		// Log error
		throw new Error("User not found");
		//redirect?
	}

	return user;
}

// getUser
// should have a get user from session.
export async function getUser(): Promise<IUser | null> {
	// try catch / if no session / if no user etc
	const sessionUser = await getSessionUser();
	if (!sessionUser) {
		return Promise.resolve(null);
	}
	return getUserFromSessionId(sessionUser.user_id);
}
