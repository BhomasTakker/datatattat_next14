import Article from "@/models/Article";
import { CollectionItem } from "@/types/data-structures/collection/item/item";

export const getArticleBySrc = async (src: string) => {
	return await Article.findOne({ src }).lean();
};

export const saveOrCreateArticleBySrc = async (article: CollectionItem) => {
	const { src, description, details, variant, guid, avatar, title } = article;

	const newArticle = {
		title,
		src,
		description,
		guid,
		variant,
		details,
		avatar,
	};
	try {
		const res = await Article.findOneAndUpdate(
			{ src }, // find
			newArticle, // update
			{
				// options
				new: true,
				upsert: true, // Make this update into an upsert
			}
		);

		return { result: res, message: "Saved Article!" };
	} catch (err) {
		console.error(err);
		// throw?
		return { message: "Error saving article" };
	}
};
