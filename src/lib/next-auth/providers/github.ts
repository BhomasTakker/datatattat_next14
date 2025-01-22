import { checkAndCreateUsername } from "@/actions/signup/check-create-username";
import { createNewUser, getUserBySignInEmail } from "@/lib/mongo/actions/user";
import Github from "next-auth/providers/github";

const { GITHUB_ID, GITHUB_SECRET } = process.env;

// don't error just don't return login with github
if (!GITHUB_ID || !GITHUB_SECRET) {
	throw new Error("Github ID and Secret not found");
}

export const GITHUB = Github({
	// profile: createProfile(Providers.GITHUB),
	async profile(profile) {
		// try catch and reject if fails or no email by email?
		console.log("GITHUB get user byemail profile ", profile);
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
