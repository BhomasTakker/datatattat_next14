import isValidSession from "@/actions/auth/check-session";
import isSignupComplete from "@/actions/signup/signup-completed";
import { getUser } from "@/actions/user/get-user";
import { PATHS } from "@/lib/routing/paths";
import { redirect } from "next/navigation";

export default async function Page() {
	await isValidSession();
	await isSignupComplete();
	const { username } = await getUser();

	const userHome = `${PATHS.users()}/${username}`;

	redirect(`${PATHS.edit}${userHome}`);
}
