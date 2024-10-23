export const signIn = (callback: string) => {
	return `/api/auth/signin?callbackUrl=${callback}`;
};

export const signOut = (callback: string) => {
	return `/api/auth/signout?callbackUrl=${callback}`;
};

export const home = () => {
	return "/";
};

export const edit = () => {
	return "/edit";
};

export const user = (username: string) => {
	return `/user/${username}`;
};

// rem these
export const member = () => {
	return "/Member";
};

export const clientMember = () => {
	return "/ClientMember";
};

// Should export as an object perhaps
