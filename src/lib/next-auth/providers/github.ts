import { checkAndCreateUsername } from "@/actions/signup/check-create-username";
import { createNewUser, getUserBySignInEmail } from "@/lib/mongo/actions/user";
import { connectToMongoDB } from "@/lib/mongo/db";
import Github from "next-auth/providers/github";

const { GITHUB_ID, GITHUB_SECRET } = process.env;

// don't error just don't return login with github
if (!GITHUB_ID || !GITHUB_SECRET) {
	throw new Error("Github ID and Secret not found");
}
///////////////////////////
// Login / timeout issue
// Looks like mongo wasn't connected
// so User call awaits indefinately
// api is outside of when we call connectMongo
// hence why we need to specifically call now
// This is okay now but felt intermittant
// adding logs almost seemed to inch it along to a fix
// We need to test as this may not solve the overall issue
////////////////////////////////////////////////////////////
export const GITHUB = Github({
	async profile(profile) {
		await connectToMongoDB();
		// try catch and reject if fails or no email by email?
		let user = await getUserBySignInEmail(profile.email || "");

		const username = profile.name || profile.login;
		// do we need some kind of fail safe? what if this fails?
		// reject and dont create user
		const uniqueUsername = await checkAndCreateUsername(username);

		if (!user) {
			user = await createNewUser({
				signup_completed: false,
				signin_method: "github",
				signin_name: profile.login,
				signin_email: profile.email || "", // shouldn't be nothing surely?
				avatar: profile.avatar_url,
				username: uniqueUsername,
				role: "standard",
			});
		}

		return {
			...profile,
			name: user.username,
			image: user.avatar,
			// probably user_id for this
			id: profile.id.toString(),
			user_id: user._id.toString(),
		};
	},
	clientId: GITHUB_ID,
	clientSecret: GITHUB_SECRET,
});
