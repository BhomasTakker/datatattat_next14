export type User = {
	name: string;
	email: string;
	image: string;
	// role: string; //union of roles
	user_id: string;
};

export type Session = {
	user: User;
};
