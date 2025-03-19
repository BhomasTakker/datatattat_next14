import Github from "next-auth/providers/github";
import { loginOrSignUp } from "../user-login";
import { returnUser } from "../user-return";

const { GITHUB_ID, GITHUB_SECRET } = process.env;

// don't error just don't return login with github
if (!GITHUB_ID || !GITHUB_SECRET) {
	throw new Error("Github ID and Secret not found");
}

export const GITHUB = Github({
	async profile(profile) {
		const user = await loginOrSignUp(profile, "github");
		return returnUser(profile, user, "github");
	},
	clientId: GITHUB_ID,
	clientSecret: GITHUB_SECRET,
});
