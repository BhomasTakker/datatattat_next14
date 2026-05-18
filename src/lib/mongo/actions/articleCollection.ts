import { RSSArticleCollection } from "@/types/data-structures/collection/collection";
import ArticleCollection from "../../../models/ArticleCollection";
import { RSSChannelType } from "@/types/data-structures/rss";
import { isValidObjectId } from "mongoose";

export const getArticleCollectionByFeed = async (feed: string) => {
	return await ArticleCollection.findOne({ feed }).lean();
};

// Perhaps not necessarily an RSSArticleCollection but we can use the same structure for now
export const getArticleCollectionsByProviderId = async (
	providerId: string,
): Promise<RSSArticleCollection[]> => {
	if (!isValidObjectId(providerId)) return [];
	try {
		return await ArticleCollection.find({ provider: providerId }).lean();
	} catch {
		return [];
	}
};

export const saveOrCreateArticleCollectionByFeed = async (
	collection: RSSChannelType,
) => {
	const { feedUrl } = collection;

	try {
		const res = await ArticleCollection.findOneAndUpdate(
			{ feed: feedUrl }, // find
			{ ...collection },
			{
				returnDocument: "after",
				upsert: true, // Make this update into an upsert
			},
		).lean();

		return { result: res, message: "Saved Article Collection!" };
	} catch {
		return { message: "Error saving article collection" };
	}
};

export const saveOrCreateArticleCollectionByFeed2 = async (
	collection: RSSArticleCollection,
) => {
	const { feed } = collection;

	try {
		const res = await ArticleCollection.findOneAndUpdate(
			{ feed }, // find
			{ ...collection },
			{
				returnDocument: "after",
				upsert: true, // Make this update into an upsert
			},
		).lean();

		return { result: res, message: "Saved Article Collection!" };
	} catch (err) {
		return { message: "Error saving article collection." };
	}
};
