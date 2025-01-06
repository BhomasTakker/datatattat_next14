import type { ISODateString } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { GITHUB } from "@/lib/next-auth/providers/github";

const providers = [GITHUB];

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
