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
import { AdminPages, UserPages } from "./pages/user-pages";
import { getCurrentHeader, getPageOrNew } from "./utils/edit";

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
	// Should do this better - layout perhaps?
	await connectToMongoDB();
	// remove me
	const session = (await getServerSession(options)) as Session;
	const { user: sessionUser } = session;

	const { role } = await isValidUser();
	const isUserAdmin = role === "admin";

	// should probably do within each component so we aren't blocking all for one
	// const userPages = await getPagesForUser(sessionUser.user_id);

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
			{isAdminEdit ? (
				<AdminPages user={sessionUser} />
			) : (
				<UserPages user={sessionUser} />
			)}
			<EditNavigation route={route} isAdminEdit={isAdminEdit} />
			<HeaderForm headerData={headerData} user={sessionUser} />
			<PageFormContainer pageData={cloneDeep(pageData)} />
		</section>
	);
};
