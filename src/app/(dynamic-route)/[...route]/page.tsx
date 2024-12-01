import { getPage } from "@/actions/page/page-actions";
import { IPage } from "@/types/page";
import { PageDisplay } from "@/components/page/page-display";
import styles from "../../page.module.scss";

export default async function Page({
	params,
}: {
	params: Promise<{ route: string[] }>;
}) {
	const { route } = await params;
	// createRouteFromParams return `/${joined}`
	const joined = route.join("/");

	const page = (await getPage(`/${joined}`)) as IPage;

	if (!page) {
		// omg do something
		return <h1>404</h1>;
	}

	return (
		<div className={styles.page}>
			<PageDisplay page={page} />
		</div>
	);
}
