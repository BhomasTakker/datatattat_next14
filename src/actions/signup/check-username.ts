"use server";

import {
	getAllUserByUsername,
	getUserByUsername,
} from "@/lib/mongo/actions/user";
import { getSessionUser, getUser } from "../user/get-user";

export async function doesUsernameExist(username: string) {
	const user = await getUserByUsername(username);

	const exists = user ? true : false;

	return exists;
}

export async function isUsernameUnique(username: string) {
	const user = await getUserByUsername(username);

	const unique = user ? false : true;

	return unique;
}

export async function isUsernameSessionUser(username: string) {
	try {
		const user = await getUserByUsername(username);
		const sessionUser = await getSessionUser();

		const doIdsMatch = user?._id.toString() === sessionUser?.user_id;

		return doIdsMatch;
	} catch (error) {
		return false;
	}
}

export async function isUsernameValid(username: string) {
	const isUnique = await isUsernameUnique(username);
	const isSessionUser = await isUsernameSessionUser(username);

	if (isUnique || isSessionUser) {
		return true;
	}

	return false;
}
