export const signIn = (callback: string) => {
	return `/api/auth/signin?callbackUrl=${callback}`;
};

export const signOut = (callback: string) => {
	return `/api/auth/signout?callbackUrl=${callback}`;
};

export const home = () => {
	return "/";
};

export const member = () => {
	return "/Member";
};

export const clientMember = () => {
	return "/ClientMember";
};
