import { IPage } from "@/types/page";
import { PageHead } from "./head/page-head";
import { PageProfile } from "./profile/page-profile";
import { PageComponentFactory } from "./components/page-component-factory";
import styles from "./page-display.module.scss";

export const PageDisplay = ({ page }: { page: IPage }) => {
	const { content, meta, profile } = page || {};

	return (
		<main className={styles.page}>
			{/* REPLACE with meta function */}
			{/* Page head for meta data, seo, etc */}
			<PageHead headData={meta} />
			{/* Page profile data for title, description, createdBy, etc */}
			<PageProfile profile={profile} />
			<PageComponentFactory content={content} />
		</main>
	);
};
