"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getUserById } from "@/lib/mongo/actions/user";
import { Session } from "@/types/auth/session";
import { IUser } from "@/types/user";
import { getServerSession } from "next-auth";

export async function getSessionUser() {
	const session = (await getServerSession(options)) as Session;
	return session.user;
}

export async function getUserFromSessionId(id: string): Promise<IUser> {
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
export async function getUser(): Promise<IUser> {
	// try catch / if no session / if no user etc
	const sessionUser = await getSessionUser();
	return getUserFromSessionId(sessionUser.user_id);
}
