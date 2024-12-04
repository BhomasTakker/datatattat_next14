import mongoose, { ObjectId, Schema, model } from "mongoose";

export interface IUser {
	signin_method: string;
	signin_name: string;
	signin_email: string;
	avatar: string;

	username: string;
	role: string;
	readonly _id?: ObjectId;
}

const UserSchema = new Schema<IUser>({
	username: {
		type: String,
		// unique: [true, "Username must be unique"],
		required: [true, "Please provide your username."],
	},

	signin_method: {
		type: String,
		required: [true, "Please provide a sign in method."],
	},

	signin_name: {
		type: String,
		required: [true, "Please provide a sign in name."],
	},

	signin_email: {
		type: String,
		required: [true, "Please provide a sign in email."],
	},

	avatar: {
		type: String,
		required: [true, "Please provide an avatar."],
	},

	role: {
		type: String,
		default: "standard",
	},
});

export const User = mongoose.models.User || model("User", UserSchema);
