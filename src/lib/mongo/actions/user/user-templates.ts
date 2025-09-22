import { IPage } from "@/types/page";
import { getUserById, updateUser } from "./user";
import { cloneDeep } from "@/utils/object";

const cleanPageData = (page: IPage) => {
	const clonedPage = cloneDeep(page);
	// Remove _id from the cloned page to avoid MongoDB duplicate key error
	delete clonedPage._id;
	// remove creator
	delete clonedPage.creator;
	// remove createdAt
	delete clonedPage.createdAt;
	// remove updatedAt
	delete clonedPage.updatedAt;
	// remove route
	delete clonedPage.route;

	return clonedPage;
};

// page template / componentTemplate
export const saveOrCreateTemplateByKey = async (
	key: string,
	page: IPage,
	userId: string
) => {
	console.log("Saving template:", { key, page, userId });
	const user = await getUserById(userId);
	if (!user) {
		throw new Error("User not found");
	}
	console.log("User found:", user);

	const clonedPage = cleanPageData(page);

	const pages = { ...(user.templates?.pages || {}), [key]: clonedPage };

	const templates = { ...user.templates, pages };
	console.log("PAGES:", pages);
	console.log("User templates updated:", templates, userId);

	// Pass the templates object directly
	const result = await updateUser(userId, { templates });

	console.log("Result of updateUser:", result);

	return result;
};
