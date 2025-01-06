"use server";

import { updateUser } from "@/lib/mongo/actions/user";
import { isUsernameValid } from "./check-username";
import { isValidUser } from "../auth/check-valid-user";

export async function confirmUsername(username: string) {
	// should check to make sure
	const user = await isValidUser();
	const isValid = await isUsernameValid(username);

	if (user.username === username && isValid) {
		const id = user._id.toString();
		return await updateUser(id, { signup_completed: true, username });
	}

	return { message: "Username is not valid" };
}
