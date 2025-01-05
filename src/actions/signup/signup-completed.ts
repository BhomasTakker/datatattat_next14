"use server";

import { PATHS } from "@/lib/routing/paths";
import { redirect } from "next/navigation";
import { getUser } from "../user/get-user";

export default async function isSignupComplete() {
	const { signup_completed, username } = await getUser();

	if (!signup_completed) {
		redirect(PATHS.profile(username));
	}
}
