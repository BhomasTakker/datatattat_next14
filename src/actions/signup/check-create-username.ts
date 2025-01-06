"use server";

import { randomThreeDigits } from "@/utils/math";
import { isUsernameUnique } from "./check-username";

export async function checkAndCreateUsername(username: string) {
	const isValid = await isUsernameUnique(username);
	if (isValid) {
		return username;
	}

	const random = randomThreeDigits();

	return await checkAndCreateUsername(`${username}-${random}`);
}
