"use server";

import { getUserByUsername } from "@/lib/mongo/actions/user";
import { getSessionUser } from "../user/get-user";
import { initialiseServices } from "@/lib/services/intialise-services";

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
	const isUnique = await isUsernameUnique(username);
	const isSessionUser = await isUsernameSessionUser(username);

	if (isUnique || isSessionUser) {
		return true;
	}

	return false;
}
