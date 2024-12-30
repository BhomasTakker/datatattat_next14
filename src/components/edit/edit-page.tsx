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

type EditProps = {
	route: string;
};

export const EditPage = async ({ route }: EditProps) => {
	const session = (await getServerSession(options)) as Session;
	const { user } = session;

	const pageData = await getPage(route);

	const mainHeader = await getMainHeader();
	const subHeaders = await getSubHeaders(route);

	const routeHeaders = route === "/" ? mainHeader : subHeaders[0];

	// we should pass in ther header data to use
	// we should manage when etc
	/// admon etc

	const routeArray = route.split("/");
	// need home OR user button

	// Route input? admin and user
	return (
		<section className={styles.root}>
			<h1>Edit Page</h1>
			{/* Probably create away from here */}
			<UserProfile user={user} />
			<p>
				Current Endpoint: <span>{route}</span>
			</p>
			<section className={styles.header}>
				<ClientHeader
					route={routeArray.slice(1, routeArray.length)}
					edit={true}
				/>
			</section>
			<HeaderForm headerData={routeHeaders || {}} />
			<PageFormContainer pageData={cloneDeep(pageData)} />
		</section>
	);
};
