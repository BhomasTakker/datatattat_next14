import { getMainHeader, getSubHeaders } from "@/actions/header/get-header";
import { getPage } from "@/actions/page/page-actions";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { PATHS } from "@/lib/routing/paths";
import { Session } from "@/types/auth/session";
import { getServerSession } from "next-auth";

export const getPageOrNew = async (route: string) => {
	try {
		return await getPage(route);
	} catch (err) {
		console.warn("Page not found, creating new page");
		const session = (await getServerSession(options)) as Session;
		const { user: sessionUser } = session;

		// Instead of creating an empty page object
		// We should display a button to create a page
		// Opening us to types and templates/clones of pages / content
		return await Promise.resolve({
			creator: sessionUser.user_id,
			route,
			content: undefined,
			meta: undefined,
			profile: undefined,
		});
	}
};

export const getCurrentHeader = async (route: string) => {
	if (route === PATHS.home()) {
		const header = await getMainHeader();
		return header;
	} else {
		const headers = await getSubHeaders(route);
		const header = headers[0];

		if (header.route.length === 0) {
			const session = (await getServerSession(options)) as Session;
			const { user: sessionUser } = session;
			const newHeaderData = {
				route,
				creator: sessionUser.user_id,
				nav: [],
			};
			return newHeaderData;
		}

		return header;
	}
};
