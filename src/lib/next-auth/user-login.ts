import { checkAndCreateUsername } from "@/actions/signup/check-create-username";
import {
	createNewUser,
	getUserBySignInEmail,
} from "../mongo/actions/user/user";
import { connectToMongoDB } from "../mongo/db";
import { Profile, ProviderFunction, providers, Providers, User } from "./types";
import {
	createGoogleUser,
	createGithubUser,
	createSpotifyUser,
} from "./create-users";

export const providerMap = new Map<Providers, ProviderFunction>([
	[providers.google, createGoogleUser as ProviderFunction],
	[providers.github, createGithubUser as ProviderFunction],
	[providers.spotify, createSpotifyUser as ProviderFunction],
]);

export const createUserObject = (
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
