import isSignupComplete from "@/actions/signup/signup-completed";
import isValidSession from "@/actions/auth/check-session";
import { isAdminUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";

export default async function Page() {
	await connectToMongoDB();
	await isValidSession();
	await isSignupComplete();
	const { username } = await isAdminUser();

	if (!username) {
		console.error("User is not valid or username is missing.");
		return null;
	}

	return (
		<div>
			<h1>CMS Page for {username}</h1>
		</div>
	);
}
