import { redirect } from "next/navigation";
import { PATHS } from "@/lib/routing/paths";
import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { isValidUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";

// export const dynamic = "force-dynamic";

export default async function Page() {
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();
	const { username } = await isValidUser();

	const userHome = `${PATHS.user(username)}`;

	redirect(`${PATHS.edit()}${userHome}`);
}
