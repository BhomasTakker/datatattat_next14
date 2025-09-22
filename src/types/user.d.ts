import { ObjectId } from "mongoose";
import { IPage } from "./page";

export interface IUser {
	signup_completed: boolean;

	signin_method: string;
	signin_name: string;
	signin_email: string;
	avatar: string;

	username: string;
	role: string;

	templates: Record<string, IPage>; // a map of template name to page object

	readonly _id: ObjectId;
}
