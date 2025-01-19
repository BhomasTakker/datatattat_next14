import { getPage } from "@/actions/page/page-actions";
import styles from "../page.module.scss";
import { IPage } from "@/types/page";
import { PageDisplay } from "@/components/page/page-display";
import { generateMetaDataFromPage } from "@/lib/metadata/generate-metadata";
import { landingPageRevalidate } from "@/lib/revalidate/revalidate";

export const generateMetadata = async () => await generateMetaDataFromPage("/");

// We need a revalidate strategy for everything
export const revalidate = landingPageRevalidate;

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
