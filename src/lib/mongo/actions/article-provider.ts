import ArticleProvider from "@/models/ArticleProvider";
import { ProviderItem } from "@/types/data-structures/collection/item/item";
import { isValidObjectId } from "mongoose";

export const getArticleProviderByName = async (name: string) => {
	return await ArticleProvider.findOne({ name }).lean();
};

export const getArticleProviderByNameFuzzy = async (name: string) => {
	// Case-insensitive partial match - supports "bbc", "BBC", "BBC News", etc.
	return await ArticleProvider.findOne({
		name: { $regex: new RegExp(name, "i") },
	}).lean();
};

export const getArticleProviderById = async (
	id: string,
): Promise<ProviderItem | null> => {
	if (!isValidObjectId(id)) return null;
	try {
		return await ArticleProvider.findById(id).lean();
	} catch {
		return null;
	}
};

export const getArticleProviderBySlug = async (
	slug: string,
): Promise<ProviderItem | null> => {
	// Decode %20 etc., then normalise: lowercase and replace hyphens with spaces
	// so "BBC%20News", "bbc-news", and "BBC NeWs" all match "BBC News"
	const normalised = decodeURIComponent(slug).toLowerCase().replace(/-/g, " ");
	try {
		return await ArticleProvider.findOne({
			name: { $regex: new RegExp(`^${normalised}$`, "i") },
		}).lean();
	} catch {
		return null;
	}
};

export const getArticleProviderByIdOrSlug = async (
	param: string,
): Promise<ProviderItem | null> => {
	if (isValidObjectId(param)) {
		return await getArticleProviderById(param);
	}
	return await getArticleProviderBySlug(param);
};

export const getArticleProviderByDomain = async (domain: string) => {
	return await ArticleProvider.findOne({ url: domain }).lean();
};

export const saveOrCreateArticleProviderByName = async (
	provider: ProviderItem,
) => {
	const { name } = provider;

	try {
		const res = await ArticleProvider.findOneAndUpdate(
			{ name }, // find
			provider, // update
			{
				returnDocument: "after",
				upsert: true, // Make this update into an upsert
			},
		);
	} catch (err) {
		console.error(err);
		return { message: "Error saving article provider" };
	}
};
