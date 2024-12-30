import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserProfile } from "./user-profile/user-profile";
import styles from "./edit-page.module.scss";
import { ClientHeader } from "../header/client-header";
import { HeaderForm } from "./header-form/header-form";
import { getPage } from "@/actions/page/page-actions";
import { getMainHeader, getSubHeaders } from "@/actions/header/get-header";
import { cloneDeep } from "@/utils/object";
import { Session } from "@/types/auth/session";
import { PageFormContainer } from "./page-form/page-form-container";
import { AdminNav } from "./admin/admin-nav";
import { getUserById } from "@/lib/mongo/actions/user";

type EditProps = {
	route: string;
	title: string;
	isAdminEdit?: boolean;
};

export const EditPage = async ({
	route,
	title,
	isAdminEdit = false,
}: EditProps) => {
	const session = (await getServerSession(options)) as Session;
	const { user: sessionUser } = session;
	const { role } = await getUserById(sessionUser.user_id);
	const isUserAdmin = role === "admin";

	const newHeaderData = {
		route,
		creator: sessionUser.user_id,
		nav: [],
	};

	let pageData = {};

	try {
		pageData = await getPage(route);
	} catch (err) {
		console.warn("Page not found, creating new page");
		pageData = {
			creator: sessionUser.user_id,
			route,
		};
	}

	const mainHeader = await getMainHeader();
	const subHeaders = await getSubHeaders(route);

	const routeHeaders = route === "/" ? mainHeader : subHeaders[0];
	const headerData =
		routeHeaders.route.length === 0 ? newHeaderData : routeHeaders;

	console.log("ROUTEN HEADER ", { routeHeaders });

	const routeArray = route.split("/");

	const routePrefix = isAdminEdit ? "/admin?route=" : "/edit?route=";
	// need home OR user button

	// Route input? admin and user
	return (
		<section className={styles.root}>
			<h1 className={styles.title}>{title}</h1>
			{isUserAdmin ? <AdminNav levels={["/"]} isAdmin={isAdminEdit} /> : null}
			{/* Probably create away from here */}
			<UserProfile user={sessionUser} />
			<p>
				Current Endpoint: <span>{route}</span>
			</p>
			<section className={styles.header}>
				<ClientHeader
					route={routeArray.slice(1, routeArray.length)}
					prefix={routePrefix}
				/>
			</section>
			<HeaderForm headerData={headerData} />
			<PageFormContainer pageData={cloneDeep(pageData)} />
		</section>
	);
};
