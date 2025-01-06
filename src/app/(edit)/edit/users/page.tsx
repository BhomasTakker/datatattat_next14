import isValidSession from "@/actions/auth/check-session";
import { isValidUser } from "@/actions/auth/check-valid-user";
import isSignupComplete from "@/actions/signup/signup-completed";
import { PATHS } from "@/lib/routing/paths";
import { redirect } from "next/navigation";

export default async function Page() {
	await isValidSession();
	await isSignupComplete();
	const { username } = await isValidUser();

	const userHome = `${PATHS.users()}/${username}`;

	redirect(`${PATHS.edit}${userHome}`);
}
