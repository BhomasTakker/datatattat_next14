import Google from "next-auth/providers/google";
import { loginOrSignUp } from "../user-login";
import { returnUser } from "../user-return";

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;

// instead of throwing an error, we could just not include the provider
// if (!GOOGLE_CLIENT_ID || !GOOGLE_SECRET) {
// 	throw new Error("Google ID and Secret not found");
// }

export const GOOGLE = Google({
	async profile(profile) {
		// try catch me and redirect to home
		const user = await loginOrSignUp(profile, "google");
		return returnUser(profile, user, "google");
		// check user creation error?
		// redirect home and notify?
	},
	clientId: GOOGLE_CLIENT_ID || "",
	clientSecret: GOOGLE_SECRET || "",
});
