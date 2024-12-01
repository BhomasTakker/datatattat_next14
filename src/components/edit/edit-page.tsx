import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { UserProfile } from "./user-profile/user-profile";
import styles from "./edit-page.module.scss";
import { ClientHeader } from "../header/client-header";
import { PageForm } from "./page-form/page-form";
import { HeaderForm } from "./header-form/header-form";
import { getPage } from "@/actions/page/page-actions";
import { getSubHeaders } from "@/actions/header/get-header";

type EditProps = {
	route: string;
};

type Session = {
	user: User;
};
type User = {
	name: string;
	email: string;
	image: string;
	role: string; //union of roles
};

export const EditPage = async ({ route }: EditProps) => {
	const session = (await getServerSession(options)) as Session;
	const { user } = session;
	const { role } = user;

	const pageData = await getPage(route);
	const headerData = await getSubHeaders(route);

	const routeArray = route.split("/");
	// routeArray.shift();

	if (role === "standard") {
	}

	// We should just use query string?
	// take in query string - check if you have the rights to edit
	// Show corresponding page
	const currentEndpoint = "/";

	// get user
	// check user role / show available pages to edit if role > standard
	// Show current endpoint
	// Route input? admin and user
	// Navigation header
	// Page Edit Form
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
			<HeaderForm headerData={headerData} route={route} />
			<PageForm pageData={pageData} route={route} />
		</section>
	);
};
