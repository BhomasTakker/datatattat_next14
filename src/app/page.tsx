import { getPage } from "@/actions/page/page-actions";
import styles from "./page.module.css";
import { IPage } from "@/types/page";
import { PageDisplay } from "@/components/page/page-display";

export default async function Home() {
	const page = (await getPage("/")) as IPage;

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
