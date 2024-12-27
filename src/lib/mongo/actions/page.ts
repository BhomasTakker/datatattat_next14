import Page from "@/models/Page";
import { IPage } from "@/types/page";

export const getPageByRoute = async (route: string) => {
	return await Page.findOne({ route }).lean();
};

export const saveOrCreatePageByRoute = async (page: IPage, creator: string) => {
	const { route } = page;

	const newPage = {
		meta: page.meta,
		route,
		profile: page.profile,
		content: page.content,
		creator,
	};
	try {
		const res = await Page.findOneAndUpdate(
			{ route }, // find
			newPage, // update
			{
				// options
				new: true,
				upsert: true, // Make this update into an upsert
			}
		);

		return { result: res, message: "Saved Page!" };
	} catch (err) {
		console.error(err);
		// throw?
		return { message: "Error saving page" };
	}
};
