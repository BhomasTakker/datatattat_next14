import { IPage } from "@/types/page";
import mongoose from "mongoose";
import { MODELS } from "./models";

const Schema = mongoose.Schema;

const ComponentSchema = new Schema(
	{
		componentType: {
			type: String,
			required: true,
		},

		componentProps: Object,
		_with: Object,
	},
	{ _id: false }
);

const ContentSchema = new Schema(
	{
		containerType: {
			type: String,
			required: true,
		},
		// We can pass a type/ref and specify from that?
		props: Schema.Types.Mixed,
		components: [ComponentSchema],
	},
	{ _id: false }
);

const PageSchema = new Schema<IPage>(
	{
		meta: {
			type: Object,
			required: false,
		},

		route: {
			type: String,
			required: true,
		},

		creator: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		profile: {
			type: Object,
			required: false,
		},
		content: ContentSchema,
	},
	{ timestamps: true }
);

export default mongoose.models.Page ||
	mongoose.model<IPage>(MODELS.Page, PageSchema);
