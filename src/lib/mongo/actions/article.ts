import Article from "@/models/Article";
import { CollectionItem } from "@/types/data-structures/collection/item/item";
import { isValidObjectId } from "mongoose";

type GetArticlesByProviderIdOptions = {
	variant?: string;
	limit?: number;
};

export const getArticlesByProviderId = async (
	providerId: string,
	options: GetArticlesByProviderIdOptions = {},
): Promise<CollectionItem[]> => {
	if (!isValidObjectId(providerId)) return [];
	const { variant, limit = 50 } = options;
	const query: Record<string, unknown> = { provider: providerId };
	if (variant) query.variant = variant;
	try {
		return await Article.find(query)
			.sort({ "details.published": -1 })
			.limit(limit)
			.lean();
	} catch {
		return [];
	}
};

export const getArticleBySrc = async (src: string) => {
	return await Article.findOne({ src }).lean();
};

export const saveOrCreateArticleBySrc = async (article: CollectionItem) => {
	const { src } = article;

	try {
		const res = await Article.findOneAndUpdate(
			{ src }, // find
			article, // update
			{
				returnDocument: "after",
				upsert: true, // Make this update into an upsert
			},
		).lean();

		return { result: res, message: "Saved Article!" };
	} catch {
		return { message: "Error saving article" };
	}
};
