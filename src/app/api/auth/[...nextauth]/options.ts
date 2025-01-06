import Github from "next-auth/providers/github";
import type { ISODateString } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { createNewUser, getUserBySignInEmail } from "@/lib/mongo/actions/user";
import { checkAndCreateUsername } from "@/actions/signup/check-create-username";

const { GITHUB_ID, GITHUB_SECRET } = process.env;

if (!GITHUB_ID || !GITHUB_SECRET) {
	throw new Error("Github ID and Secret not found");
}

const providers = [
	Github({
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
	}),
];

export type User = AdapterUser & {
	user_id?: string;
};

export interface DefaultSession {
	user?: User;
	expires: ISODateString;
}

const callbacks = {
	// server side callback
	// @ts-expect-error - types are incorrect
	async jwt({ token, user }) {
		if (user) {
			token.user_id = user.user_id;
		}
		return token;
	},

	// @ts-expect-error - types are incorrect
	async session({ session, token }) {
		if (session.user) {
			session.user.user_id = token.user_id as string;
		}
		return session;
	},
};

export const options = {
	providers,
	callbacks,
};
