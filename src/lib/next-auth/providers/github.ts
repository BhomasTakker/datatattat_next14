import Github from "next-auth/providers/github";
import { loginOrSignUp } from "../user-login";
import { returnUser } from "../user-return";

const { AUTH_GITHUB_ID, AUTH_GITHUB_SECRET } = process.env;

// don't error just don't return login with github
if (!AUTH_GITHUB_ID || !AUTH_GITHUB_SECRET) {
	throw new Error("Github ID and Secret not found");
}

export const GITHUB = Github({
	async profile(profile) {
		const user = await loginOrSignUp(profile, "github");
		return returnUser(profile, user, "github");
	},
	clientId: AUTH_GITHUB_ID,
	clientSecret: AUTH_GITHUB_SECRET,
});
