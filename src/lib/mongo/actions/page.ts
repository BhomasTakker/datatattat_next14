import Page from "@/models/Page";
import { IPage } from "@/types/page";

export const getPageByRoute = async (route: string) => {
	const decodedRoute = decodeURI(route);
	return await Page.findOne({ route: decodedRoute }).lean();
};

export const saveOrCreatePageByRoute = async (page: IPage, creator: string) => {
	const { route } = page;

	const decodedRoute = decodeURI(route);

	const newPage = {
		meta: page.meta,
		route: decodedRoute,
		profile: page.profile,
		content: page.content,
		creator,
	};
	try {
		const res = await Page.findOneAndUpdate(
			{ route: decodedRoute }, // find
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
