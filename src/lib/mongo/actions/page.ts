import Page from "@/models/Page";

export const getPageByRoute = async (route: string) => {
	// should we be cloneDeeping this?
	return await Page.findOne({ route }).lean();
};
