import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserProfile } from "./user-profile/user-profile";
import styles from "./edit-page.module.scss";
import { ClientHeader } from "../header/client-header";
import { PageForm } from "./page-form/page-form";
import { HeaderForm } from "./header-form/header-form";
import { getPage } from "@/actions/page/page-actions";
import { getSubHeaders } from "@/actions/header/get-header";
import { cloneDeep } from "@/utils/object";
import { Session } from "@/types/auth/session";

type EditProps = {
	route: string;
};

export const EditPage = async ({ route }: EditProps) => {
	const session = (await getServerSession(options)) as Session;
	const { user } = session;

	const pageData = await getPage(route);
	const headerData = await getSubHeaders(route);

	const routeArray = route.split("/");

	// Route input? admin and user
	return (
		<section className={styles.root}>
			<h1>Edit Page</h1>
			{/* Probably create away from here */}
			<UserProfile user={user} />
			<p>
				Current Endpoint: <span>{route}</span>
			</p>
			{/* header or Route selector - link with query string no? */}
			<section className={styles.header}>
				<ClientHeader
					route={routeArray.slice(1, routeArray.length)}
					edit={true}
				/>
			</section>
			{/* Page Edit Form */}
			<HeaderForm headerData={headerData} />
			<PageForm pageData={cloneDeep(pageData)} />
		</section>
	);
};
