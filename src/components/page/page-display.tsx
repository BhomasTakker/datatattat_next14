import { IPage } from "@/types/page";
import { PageProfile } from "./profile/page-profile";
import { PageComponentFactory } from "./components/page-component-factory";
import styles from "./page-display.module.scss";
import { getCurrentRoute } from "@/utils/route";

export const PageDisplay = async ({ page }: { page: IPage }) => {
	const { content, meta, profile } = page || {};

	// not here
	const currentRoute = await getCurrentRoute();
	const isUserRoute = currentRoute?.includes("/users/") || false;
	const isClient = isUserRoute;

	return (
		<main className={styles.page}>
			{/* REPLACE with meta function */}
			{/* Page head for meta data, seo, etc */}
			{/* <PageHead headData={meta} /> */}
			{/* Page profile data for title, description, createdBy, etc */}
			<PageProfile profile={profile} />
			<PageComponentFactory content={content} isClient={isClient} />
		</main>
	);
};
