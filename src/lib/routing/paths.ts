const signIn = (callback: string) => {
	return `/api/auth/signin?callbackUrl=${callback}`;
};

const signOut = (callback: string) => {
	return `/api/auth/signout?callbackUrl=${callback}`;
};

const home = () => {
	return "/";
};

const edit = () => {
	return "/edit";
};

const admin = () => {
	return "/admin";
};

const user = (username: string) => {
	return `/users/${username}`;
};

const users = () => {
	return "/users";
};

const error = () => {
	return `/error`;
};

const profile = () => {
	return `/profile`;
};

// Should export as an object perhaps / absolutely should!! home and edit!! lol
export const PATHS = {
	signIn,
	signOut,
	home,
	edit,
	user,
	users,
	admin,
	error,
	profile,
};
