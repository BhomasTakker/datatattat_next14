"use server";

import { connectToMongoDB } from "@/lib/mongo/db";
import isValidSession from "../auth/check-session";
import { isAdminUser } from "../auth/check-valid-user";
import isSignupComplete from "../signup/signup-completed";

export async function initCMSPage() {
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();
	const user = await isAdminUser();
	return user;
}
