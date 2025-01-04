import { User } from "@/models/User";
import { IUser } from "@/types/user";

export const getUserBySignInEmail = async (email: string) => {
	return await User.findOne({ signin_email: email });
};

export const getUserById = async (id: string) => {
	return (await User.findOne({ _id: id })) as IUser;
};

export const createNewUser = async (user: IUser) => {
	try {
		const newUser = new User(user);
		return { message: "User Created", user: await newUser.save() };
	} catch (err) {
		console.error(err);
		return { message: "Error saving header" };
	}
};
