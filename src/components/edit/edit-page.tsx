import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserProfile } from "./user-profile/user-profile";
import styles from "./edit-page.module.scss";
import { HeaderForm } from "./header-form/header-form";
import { getPage } from "@/actions/page/page-actions";
import { getMainHeader, getSubHeaders } from "@/actions/header/get-header";
import { cloneDeep } from "@/utils/object";
import { Session } from "@/types/auth/session";
import { PageFormContainer } from "./page-form/page-form-container";
import { AdminNav } from "./admin/admin-nav";
import { EditNavigation } from "./navigation/edit-navigation";
import { PATHS } from "@/lib/routing/paths";
import { isValidUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";

type EditProps = {
	route: string;
	title: string;
	isAdminEdit?: boolean;
};

const getPageOrNew = async (route: string) => {
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

const getCurrentHeader = async (route: string) => {
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

export const EditPage = async ({
	route,
	title,
	isAdminEdit = false,
}: EditProps) => {
	// Should do this better - layout perhaps?
	await connectToMongoDB();
	// remove me
	const session = (await getServerSession(options)) as Session;
	const { user: sessionUser } = session;

	const { role } = await isValidUser();
	const isUserAdmin = role === "admin";

	const pageData = await getPageOrNew(route);

	const headerData = await getCurrentHeader(route);

	return (
		<section className={styles.root}>
			<h1 className={styles.title}>{title}</h1>
			{isUserAdmin ? <AdminNav levels={["/"]} isAdmin={isAdminEdit} /> : null}
			{/* Probably create away from here - use user */}
			<UserProfile user={sessionUser} />
			<p>
				Current Endpoint: <span>{route}</span>
			</p>
			<EditNavigation route={route} isAdminEdit={isAdminEdit} />
			<HeaderForm headerData={headerData} />
			<PageFormContainer pageData={cloneDeep(pageData)} />
		</section>
	);
};
