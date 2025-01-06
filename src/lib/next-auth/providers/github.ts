import { checkAndCreateUsername } from "@/actions/signup/check-create-username";
import { createNewUser, getUserBySignInEmail } from "@/lib/mongo/actions/user";
import Github from "next-auth/providers/github";

const { GITHUB_ID, GITHUB_SECRET } = process.env;

if (!GITHUB_ID || !GITHUB_SECRET) {
	throw new Error("Github ID and Secret not found");
}

export const GITHUB = Github({
	async profile(profile) {
		// try catch this
		// what do we do/return if a failure?
		let user = await getUserBySignInEmail(profile.email || "");

		const username = profile.name || profile.login;
		// do we need some kind of fail safe? what if this fails?
		const uniqueUsername = await checkAndCreateUsername(username);

		if (!user) {
			user = await createNewUser({
				signup_completed: false,
				signin_method: "github",
				signin_name: profile.login,
				signin_email: profile.email || "",
				avatar: profile.avatar_url,
				username: uniqueUsername,
				role: "standard",
			});
		}

		return {
			...profile,
			name: profile.name || profile.login,
			image: profile.avatar_url,
			id: profile.id.toString(),
			user_id: user._id.toString(),
		};
	},
	clientId: GITHUB_ID,
	clientSecret: GITHUB_SECRET,
});
