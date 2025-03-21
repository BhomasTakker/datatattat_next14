import { User } from "@/models/User";
import { IUser } from "@/types/user";

export const getUserBySignInEmail = async (email: string) => {
	return await User.findOne({ signin_email: email });
};

export const getUserById = async (id: string) => {
	return (await User.findOne({ _id: id })) as IUser;
};

export const getUserByUsername = async (username: string) => {
	const decodedUsername = decodeURI(username);
	return (await User.findOne({ username: decodedUsername })) as IUser;
};

export const getAllUserByUsername = async (username: string) => {
	const decodedUsername = decodeURI(username);
	return (await User.find({ username: decodedUsername })) as IUser[];
};

export const createNewUser = async (user: Omit<IUser, "_id">) => {
	try {
		const newUser = new User(user);
		return await newUser.save();
		// return { message: "User Created", user: await newUser.save() };
	} catch (err) {
		console.error(err);
		return { message: "Error creating user" };
	}
};

export const updateUser = async (id: string, user: Partial<IUser>) => {
	try {
		// create if doesn't exist. Perhaps should not be.
		const updatedUser = await User.findOneAndUpdate({ _id: id }, user, {
			new: true,
		});
		return { message: "User Updated" };
	} catch (err) {
		console.error(err);
		return { message: "Error updating user" };
	}
};
