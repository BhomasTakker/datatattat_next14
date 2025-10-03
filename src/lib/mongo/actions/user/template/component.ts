import { cloneDeep } from "@/utils/object";
import { getUserById, updateUser } from "../user";

export const getComponentTemplateByKey = async (
	key: string,
	userId: string
) => {
	const user = await getUserById(userId);
	if (!user) {
		throw new Error("User not found");
	}

	return user.templates?.components?.[key] || null;
};

export const saveOrCreateComponentTemplateByKey = async (
	key: string,
	component: any,
	userId: string
) => {
	const user = await getUserById(userId);
	if (!user) {
		throw new Error("User not found");
	}

	const clonedComponent = cloneDeep(component);

	// add or overwrite
	const components = {
		...(user.templates?.components || {}),
		[key]: clonedComponent,
	};

	const templates = { ...user.templates, components };

	// There is probably a cleaner safer way to do this
	// Pass the templates object directly
	const result = await updateUser(userId, { templates });

	return result;
};
