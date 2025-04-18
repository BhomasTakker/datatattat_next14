import { headers } from "next/headers";

export const getCurrentRoute = async () => {
	const headersList = await headers();
	const currentRoute = headersList.get("x-pathname");
	return currentRoute;
};
