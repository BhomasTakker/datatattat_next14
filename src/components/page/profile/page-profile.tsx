import { PageProfile as IPageProfile } from "@/types/page";
import styles from "./page-profile.module.scss";
import { PageProfileTitle } from "./title/page-profile-title";

interface PageProfileProps {
	profile: IPageProfile;
}

// Show title
// Eventually show description, createdBy, created, updated, etc
export const PageProfile = ({ profile }: PageProfileProps) => {
	const { pageTitle, showPageTitle } = profile || {};

	return (
		// set classname to be root & root-{given-variant}
		<div className={styles.root} data-testid="page-profile-root">
			{showPageTitle && pageTitle ? (
				<PageProfileTitle title={pageTitle} />
			) : null}
		</div>
	);
};
