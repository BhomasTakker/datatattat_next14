import { RSSArticleCollection } from "@/types/data-structures/collection/collection";
import mongoose, { model, Schema } from "mongoose";

const ImageSchema = new Schema(
	{
		src: {
			type: String,
			required: [true, "Please provide a src."],
		},
		alt: {
			type: String,
			default: "We apologize, but the image has no alt text available.",
		},
		link: {
			type: String,
		},
	},
	{ _id: false }
);

const ArticleCollectionSchema = new Schema<RSSArticleCollection>({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	link: {
		type: String,
	},
	items: {
		type: [String],
		required: [true, "Please provide items."],
	},
	lastBuildDate: {
		type: Date,
	},
	image: {
		type: ImageSchema,
	},
	feed: {
		type: String,
	},
});

export default mongoose.models.ArticleCollection ||
	model<RSSArticleCollection>("ArticleCollection", ArticleCollectionSchema);
