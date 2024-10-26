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

const user = (username: string) => {
	return `/user/${username}`;
};

// rem these
const member = () => {
	return "/Member";
};

const clientMember = () => {
	return "/ClientMember";
};

// Should export as an object perhaps / absolutely should!! home and edit!! lol
export const PATHS = {
	signIn,
	signOut,
	home,
	edit,
	user,
	member,
	clientMember,
};
