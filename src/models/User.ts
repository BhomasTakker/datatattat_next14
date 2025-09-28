import { IUser } from "@/types/user";
import mongoose, { ObjectId, Schema, model } from "mongoose";
import { MODELS } from "./models";

const UserSchema = new Schema<IUser>(
	{
		signup_completed: {
			type: Boolean,
			default: false,
		},
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
		templates: {
			pages: {
				type: Schema.Types.Mixed,
				required: false,
				default: {},
			},
			components: {
				type: Schema.Types.Mixed,
				required: false,
				default: {},
			},
		},
	},
	{ timestamps: true }
);

export const User = mongoose.models.User || model(MODELS.User, UserSchema);
