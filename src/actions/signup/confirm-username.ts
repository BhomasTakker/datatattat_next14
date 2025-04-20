"use server";

import { updateUser } from "@/lib/mongo/actions/user";
import { isUsernameValid } from "./check-username";
import { isValidUser } from "../auth/check-valid-user";
import { initialiseServices } from "@/lib/services/intialise-services";

export async function confirmUsername(username: string) {
	await initialiseServices();
	// make sure user is logged in
	// and has a valid session
	const user = await isValidUser();
	if (!user) {
		return { message: "User not found" };
	}
	// check if username is valid
	const isValid = await isUsernameValid(username);

	if (!isValid) {
		return { message: "Username is not valid" };
	}

	const id = user._id.toString();
	try {
		const updatedUser = await updateUser(id, {
			signup_completed: true,
			username,
		});
		return updatedUser;
	} catch (error) {
		console.error("Error updating user:", error);
		return { message: "Error updating user" };
	}
}
