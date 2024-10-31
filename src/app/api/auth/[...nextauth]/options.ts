import Github from "next-auth/providers/github";
import type { ISODateString } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

const { GITHUB_ID, GITHUB_SECRET } = process.env;

if (!GITHUB_ID || !GITHUB_SECRET) {
	throw new Error("Github ID and Secret not found");
}

const providers = [
	Github({
		profile(profile) {
			let userRole = "standard";

			if (profile.name === "BhomasTakker") {
				userRole = "admin";
			}

			return {
				...profile,
				name: profile.name || profile.login,
				role: userRole,
				image: profile.avatar_url,
				id: profile.id.toString(),
			};
		},
		clientId: GITHUB_ID,
		clientSecret: GITHUB_SECRET,
	}),
];

export type User = AdapterUser & {
	role?: string | null;
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
			token.role = user.role;
		}
		return token;
	},
	// @ts-expect-error - types are incorrect
	async session({ session, token }) {
		if (session.user) session.user.role = token.role as string;
		return session;
	},
};

export const options = {
	providers,
	callbacks,
};
