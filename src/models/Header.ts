import mongoose from "mongoose";
import { MODELS } from "./models";

const Schema = mongoose.Schema;

const NavItemSchema = new Schema(
	{
		label: {
			type: String,
			required: true,
		},
		route: {
			type: String,
			required: true,
		},
	},
	{ _id: false }
);

const HeaderSchema = new Schema(
	{
		route: {
			type: String,
			required: true,
		},
		nav: [NavItemSchema],
		creator: {
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Header ||
	mongoose.model(MODELS.Header, HeaderSchema);
