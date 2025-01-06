"use server";

import { PATHS } from "@/lib/routing/paths";
import { redirect } from "next/navigation";
import { isValidUser } from "../auth/check-valid-user";

export default async function isSignupComplete() {
	const { signup_completed, username } = await isValidUser();

	if (!signup_completed) {
		redirect(PATHS.profile(username));
	}
}
