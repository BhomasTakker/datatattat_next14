import { RSSArticleCollection } from "@/types/data-structures/collection/collection";
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
			{ ...collection },
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

export const saveOrCreateArticleCollectionByFeed2 = async (
	collection: RSSArticleCollection
) => {
	const { feed } = collection;

	try {
		const res = await ArticleCollection.findOneAndUpdate(
			{ feed }, // find
			{ ...collection },
			{
				new: true,
				upsert: true, // Make this update into an upsert
			}
		).lean();

		return { result: res, message: "Saved Article Collection!" };
	} catch (err) {
		return { message: "Error saving article collection." };
	}
};
