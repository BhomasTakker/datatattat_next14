import { IPage } from "@/types/page";
import mongoose from "mongoose";

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
const ContainerSchema = new Schema(
	{
		containerType: {
			type: String,
			required: true,
		},
		initData: Object,
	},
	{ _id: false }
);

const ContentSchema = new Schema(
	{
		container: ContainerSchema,
		// We can pass a type/ref and specify from that?
		props: Schema.Types.Mixed,
		components: [ComponentSchema],
	},
	{ _id: false }
);

const PageSchema = new Schema<IPage>({
	// think added seems superflous here
	// store data in an object
	// we don't want to be adding things at this level
	style: {
		type: Object,
		required: false,
	},

	// remove this
	// profile: {
	// 	type: Object,
	// 	required: false,
	// },

	// meta, route
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
	createdAt: Date,
	updatedAt: Date,
	content: ContentSchema,
});

export default mongoose.models.Page ||
	mongoose.model<IPage>("Page", PageSchema);
