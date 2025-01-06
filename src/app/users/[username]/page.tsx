import { getPage } from "@/actions/page/page-actions";
import { IPage } from "@/types/page";
import { PageDisplay } from "@/components/page/page-display";
import styles from "../../page.module.scss";
import { PATHS } from "@/lib/routing/paths";

export default async function UserHome({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
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
