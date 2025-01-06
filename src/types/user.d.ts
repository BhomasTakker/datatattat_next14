import { ObjectId } from "mongoose";

export interface IUser {
	signup_completed: boolean;

	signin_method: string;
	signin_name: string;
	signin_email: string;
	avatar: string;

	username: string;
	role: string;

	readonly _id: ObjectId;
}
