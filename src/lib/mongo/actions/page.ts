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

export const getPagesByUserId = async (userId: string) => {
	return await Page.find({ creator: userId }).lean();
};

export const deletePagesByUserId = async (userId: string) => {
	return await Page.findOneAndDelete({ creator: userId }).lean();
};

export const deletePageByRoute = async (route: string) => {
	return await Page.findOneAndDelete({ route: decodeURI(route) }).lean();
};

export const createNewPageByRoute = async (route: string, userId: string) => {
	const decodedRoute = decodeURI(route);
	if (!decodedRoute || !userId) {
		throw new Error("Invalid route or userId");
	}
	try {
		await Page.create({
			route: decodedRoute,
			creator: userId,
			meta: {
				pageTitle: "New Page",
				pageDescription: "New Page Description",
				pageKeywords: "new, page, keywords",
				pageImage: "",
				favIcons: [],
				showCardData: false,
				cardData: {
					title: "",
					description: "",
					image: "",
					["image:alt"]: "",
					locale: "",
					site_name: "",
					url: "",
				},
			},
			content: {
				containerType: "Stack",
				props: {},
				components: [],
			},
		});
		return { success: true, message: "Page created successfully" };
	} catch {
		return { success: false, message: "Error creating page" };
	}
};
