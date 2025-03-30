import ArticleProvider from "@/models/ArticleProvider";
import { ProviderItem } from "@/types/data-structures/collection/item/item";

export const getArticleProviderByName = async (name: string) => {
	return await ArticleProvider.findOne({ name }).lean();
};

export const getArticleProviderByDomain = async (domain: string) => {
	return await ArticleProvider.findOne({ url: domain }).lean();
};

export const saveOrCreateArticleProviderByName = async (
	provider: ProviderItem
) => {
	const { name } = provider;

	try {
		const res = await ArticleProvider.findOneAndUpdate(
			{ name }, // find
			provider, // update
			{
				new: true,
				upsert: true, // Make this update into an upsert
			}
		);
	} catch (err) {
		console.error(err);
		return { message: "Error saving article provider" };
	}
};
