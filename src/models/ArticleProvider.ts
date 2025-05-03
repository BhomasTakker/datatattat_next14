import { ProviderItem } from "@/types/data-structures/collection/item/item";
import mongoose, { model, Schema } from "mongoose";

const ArticleProviderSchema = new Schema<ProviderItem>(
	{
		name: {
			type: String,
			required: [true, "Please provide a name."],
		},
		description: {
			type: String,
			required: [true, "Please provide a description."],
		},
		url: {
			type: String,
			required: [true, "Please provide a url."],
		},
		rating: {
			type: Number,
			required: [true, "Please provide a rating."],
		},
		leaning: {
			type: Number,
			required: [true, "Please provide a leaning."],
		},
		origin: {
			type: String,
			required: [true, "Please provide an origin."],
		},
		logo: String,
	},
	{ timestamps: true }
);

export default mongoose.models.ArticleProvider ||
	model<ProviderItem>("ArticleProvider", ArticleProviderSchema);
