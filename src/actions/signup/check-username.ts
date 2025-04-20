"use server";

import { getUserByUsername } from "@/lib/mongo/actions/user";
import { getSessionUser } from "../user/get-user";
import { initialiseServices } from "@/lib/services/intialise-services";
import { patterns } from "@/utils/regex";

export async function doesUsernameExist(username: string) {
	await initialiseServices();
	const user = await getUserByUsername(username);

	const exists = user ? true : false;

	return exists;
}

export async function isUsernameUnique(username: string) {
	await initialiseServices();
	const user = await getUserByUsername(username);

	const unique = user ? false : true;

	return unique;
}

export async function isUsernameSessionUser(username: string) {
	try {
		await initialiseServices();
		const user = await getUserByUsername(username);
		const sessionUser = await getSessionUser();

		const doIdsMatch = user?._id.toString() === sessionUser?.user_id;

		return doIdsMatch;
	} catch (error) {
		return false;
	}
}

export async function isUsernameValid(username: string) {
	await initialiseServices();
	// Is username unique
	const isUnique = await isUsernameUnique(username);

	// if username is current user then it's okay for now
	const isSessionUser = await isUsernameSessionUser(username);

	//?
	if (isSessionUser) {
		return true;
	}

	if (!username.match(patterns.username.regex)) {
		return false;
	}

	if (isUnique) {
		return true;
	}

	return false;
}
