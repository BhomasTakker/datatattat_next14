import { getPage } from "@/actions/page/page-actions";
import { IPage } from "@/types/page";
import styles from "../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";

export const dynamic = "force-dynamic";

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ route: string[] }>;
	searchParams?: { route: string };
}) {
	const page = (await getPage("/")) as IPage;
	const { route = "/" } = searchParams || {};

	if (!page) {
		return <h1>404</h1>;
	}

	return (
		<div className={styles.page}>
			<EditPage route={route} />
		</div>
	);
}
