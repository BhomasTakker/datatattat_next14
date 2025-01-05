import { User } from "@/models/User";
import { IUser } from "@/types/user";

export const getUserBySignInEmail = async (email: string) => {
	return await User.findOne({ signin_email: email });
};

export const getUserById = async (id: string) => {
	return (await User.findOne({ _id: id })) as IUser;
};

export const getUserByUsername = async (username: string) => {
	return (await User.findOne({ username })) as IUser;
};

export const getAllUserByUsername = async (username: string) => {
	return (await User.find({ username })) as IUser[];
};

export const createNewUser = async (user: Omit<IUser, "_id">) => {
	try {
		const newUser = new User(user);
		return { message: "User Created", user: await newUser.save() };
	} catch (err) {
		console.error(err);
		return { message: "Error saving header" };
	}
};
