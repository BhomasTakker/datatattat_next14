import styles from "./page-title.module.scss";

type PageTitleProps = {
	title: string;
	description?: string;
	Icon?: React.ComponentType<{ className?: string }>;
};

export const PageTitle = ({ title, description, Icon }: PageTitleProps) => {
	return (
		<div className={styles.header}>
			<div className={styles.titleWrapper}>
				{Icon && <Icon className={styles.icon} />}
				<h1 className={styles.title}>{title}</h1>
			</div>
			{description && <p className={styles.description}>{description}</p>}
		</div>
	);
};
