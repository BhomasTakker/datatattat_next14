import styles from "./page-profile-title.module.scss";

type PageProfileTitleProps = {
	title: string;
};

export const PageProfileTitle = ({ title }: PageProfileTitleProps) => {
	return (
		<div className={styles.root} data-testid="page-profile-title-root">
			<h1 className={styles.title} data-testid="page-profile-title">
				{title}
			</h1>
			<div className={styles.rule} />
		</div>
	);
};
