import { Profile, providers, Providers, User } from "./types";

const githubUsereturn = (profile: Profile, user: User) => {
	return {
		...profile,
		name: user.username,
		image: user.avatar,
		id: profile.id.toString(),
		user_id: user._id.toString(),
	};
};

const googleUserReturn = (profile: Profile, user: User) => {
	console.log("user", user);
	return {
		...profile,
		name: user.username,
		image: user.avatar,
		id: user._id.toString(),
		user_id: user._id.toString(),
	};
};

const providerReturnMap = new Map<Providers, any>([
	[providers.google, googleUserReturn],
	[providers.github, githubUsereturn],
]);

export const returnUser = (profile: Profile, user: User, id: Providers) => {
	const userReturn = providerReturnMap.get(id);
	if (!userReturn) {
		throw new Error("Invalid provider");
	}
	return userReturn(profile, user);
};
