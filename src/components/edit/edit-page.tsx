import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserProfile } from "./user-profile/user-profile";
import styles from "./edit-page.module.scss";
import { HeaderForm } from "./header-form/header-form";
import { cloneDeep } from "@/utils/object";
import { Session } from "@/types/auth/session";
import { PageFormContainer } from "./page-form/page-form-container";
import { AdminNav } from "./admin/admin-nav";
import { EditNavigation } from "./navigation/edit-navigation";
import { isValidUser } from "@/actions/auth/check-valid-user";
import { connectToMongoDB } from "@/lib/mongo/db";
import { AdminPages, UserPages } from "./pages/user-pages";
import { getCurrentHeader, getPageOrNew } from "./utils/edit";
import { PageTitle } from "../ui/typography/title/page-title";
import { MdAdminPanelSettings, MdEdit } from "react-icons/md";

type EditProps = {
	route: string;
	isAdminEdit?: boolean;
};

export const EditPage = async ({ route, isAdminEdit = false }: EditProps) => {
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

	const variant = isAdminEdit ? "admin" : "edit";
	const pageTitle = isAdminEdit ? "Admin Edit" : "Edit Page";
	const Icon = isAdminEdit ? MdAdminPanelSettings : MdEdit; // Placeholder for different icons if needed

	return (
		<section className={styles.root}>
			<PageTitle title={pageTitle} variant={variant} Icon={Icon} />
			{/* {isUserAdmin ? <AdminNav levels={["/"]} isAdmin={isAdminEdit} /> : null} */}
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
