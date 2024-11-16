import Page from "@/models/Page";

export const getPageByRoute = async (route: string) => {
	return await Page.findOne({ route }).lean();
};
