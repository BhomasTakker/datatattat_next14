import styles from "./page-profile.module.scss";

interface Profile {
	pageTitle?: string;
	pageTitleVariant?: string; //union
	showPageTitle?: boolean;
}

interface PageProfile {
	profile: Profile;
}

// Show title
// Eventually show description, createdBy, created, updated, etc
export const PageProfile = ({ profile }: PageProfile) => {
	const { pageTitle, showPageTitle } = profile || {};

	return (
		// Same component and styles (almost) as component
		<div className={styles.root} data-testid="page-profile-root">
			{showPageTitle && pageTitle ? (
				<h1 className={styles.title}>{pageTitle}</h1>
			) : null}
		</div>
	);
};
