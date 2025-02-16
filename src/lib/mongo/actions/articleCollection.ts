import ArticleCollection from "../../../models/ArticleCollection";
import { RSSChannelType } from "@/types/data-structures/rss";

export const getArticleCollectionByFeed = async (feed: string) => {
	return await ArticleCollection.findOne({ feed }).lean();
};

export const saveOrCreateArticleCollectionByFeed = async (
	collection: RSSChannelType
) => {
	const { feedUrl } = collection;

	try {
		const res = await ArticleCollection.findOneAndUpdate(
			{ feed: feedUrl }, // find
			collection, // update
			{
				new: true,
				upsert: true, // Make this update into an upsert
			}
		).lean();

		return { result: res, message: "Saved Article Collection!" };
	} catch {
		return { message: "Error saving article collection" };
	}
};
