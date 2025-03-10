import { getPage } from "@/actions/page/page-actions";
import { IPage } from "@/types/page";
import { PageDisplay } from "@/components/page/page-display";
import styles from "../../../page.module.scss";
import { PATHS } from "@/lib/routing/paths";
import { generateMetaDataFromPage } from "@/lib/metadata/generate-metadata";
import { MainHeader } from "@/components/header/main-header";

type Params = Promise<{ route: string[]; username: string }>;
type Props = {
	params: Params;
};

export const revalidate = 600;

export const generateMetadata = async ({ params }: Props) => {
	const { username, route } = await params;
	const joined = route.join("/");
	const userPage = `${PATHS.user(username)}/${joined}`;

	const metadata = await generateMetaDataFromPage(userPage);
	return metadata;
};

export default async function UserHome({ params }: Props) {
	const { username, route } = await params;
	const headerRoute = ["users", username, ...route];
	const joined = route.join("/");
	const userPage = `${PATHS.user(username)}/${joined}`;
	const page = (await getPage(userPage)) as IPage;

	if (!page) {
		// omg do something
		// no page then homepage or redirect back
		return <h1>404</h1>;
	}

	return (
		<>
			<MainHeader route={headerRoute} />
			<div className={styles.page}>
				<PageDisplay page={page} />
			</div>
		</>
	);
}
