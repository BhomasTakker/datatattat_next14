import { checkAndCreateUsername } from "@/actions/signup/check-create-username";
import { createNewUser, getUserBySignInEmail } from "../mongo/actions/user";
import { connectToMongoDB } from "../mongo/db";
import { GoogleProfile } from "next-auth/providers/google";
import { GithubProfile } from "next-auth/providers/github";
import { Profile, ProviderFunction, providers, Providers, User } from "./types";

const createGoogleUser = (
	profile: GoogleProfile,
	id: Providers,
	username: string
) => ({
	signup_completed: false,
	signin_method: id,
	signin_name: profile.name,
	signin_email: profile.email || "", // shouldn't be nothing surely?
	avatar: profile.picture,
	username,
	role: "standard",
});

const createGithubUser = (
	profile: GithubProfile,
	id: Providers,
	username: string
) => ({
	signup_completed: false,
	signin_method: id,
	signin_name: profile.login,
	signin_email: profile.email || "", // shouldn't be nothing surely?
	avatar: profile.avatar_url,
	username,
	role: "standard",
});

const providerMap = new Map<Providers, ProviderFunction>([
	[providers.google, createGoogleUser as ProviderFunction],
	[providers.github, createGithubUser as ProviderFunction],
]);

const createUserObject = (
	profile: Profile,
	id: Providers,
	username: string
) => {
	const createUser = providerMap.get(id);
	if (!createUser) {
		throw new Error("Invalid provider");
	}
	return createUser(profile, id, username);
};

export const loginOrSignUp = async (
	profile: Profile,
	id: Providers
): Promise<User> => {
	// call generic function and pass in profile and an id
	await connectToMongoDB();
	// try catch and reject if fails or no email by email?
	let user = await getUserBySignInEmail(profile.email || "");

	const username = profile.name || profile.login;
	// do we need some kind of fail safe? what if this fails?
	// reject and dont create user
	const uniqueUsername = await checkAndCreateUsername(username);

	if (!user) {
		user = await createNewUser(createUserObject(profile, id, uniqueUsername));
	}

	return user;
};
