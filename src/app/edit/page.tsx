import styles from "../page.module.scss";
import { EditPage } from "@/components/edit/edit-page";

export const dynamic = "force-dynamic";

export default async function Page({
	searchParams,
}: {
	searchParams?: { route: string };
}) {
	const { route = "/" } = searchParams || {};

	return (
		<div className={styles.page}>
			<EditPage route={route} />
		</div>
	);
}
