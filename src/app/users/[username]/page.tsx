import { getPage } from "@/actions/page/page-actions";
import { IPage } from "@/types/page";
import { PageDisplay } from "@/components/page/page-display";
import styles from "../../page.module.scss";
import { PATHS } from "@/lib/routing/paths";
import { generateMetaDataFromPage } from "@/lib/metadata/generate-metadata";
import { userPageRevalidate } from "@/lib/revalidate/revalidate";

type Params = Promise<{ username: string }>;
type Props = {
	params: Params;
};

export const revalidate = userPageRevalidate;

export const generateMetadata = async ({ params }: Props) => {
	const { username } = await params;

	const metadata = await generateMetaDataFromPage(PATHS.user(username));
	return metadata;
};

export default async function UserHome({ params }: Props) {
	const { username } = await params;

	const page = (await getPage(PATHS.user(username))) as IPage;

	if (!page) {
		// omg do something
		// no page then homepage or redirect back
		return <h1>404</h1>;
	}

	return (
		<div className={styles.page}>
			<PageDisplay page={page} />
		</div>
	);
}
