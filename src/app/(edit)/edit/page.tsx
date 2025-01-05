import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { getUser } from "@/actions/user/get-user";

// export const dynamic = "force-dynamic";

export default async function Page() {
	await isValidSession();
	await isSignupComplete();
	const { username } = await getUser();

	const userHome = `${PATHS.user(username)}`;

	redirect(`${PATHS.edit()}${userHome}`);
}
